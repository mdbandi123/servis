const express = require("express");
const auth = require("../middlewares/auth");

const menu_model = require("../models/menu").menu_model;

const route = express();
const bodyParser = require("body-parser");

route.use(bodyParser.json());

// get all menu items and categories
route.get("/", async (req, res) => {
    try {
        const menu = await menu_model.find();
        res.status(200).json({
            success: true,
            menu: menu,
        });
    } catch (err) {
        res.send(err);
    }
});

// retrieves all categories
route.get("/categories", async (req, res) => {
    try {
        //only find category_name
        const menu = await menu_model.find({});
        res.status(200).json({
            success: true,
            categories: menu,
        });
    } catch (err) {
        res.send(err);
    }
});

// retrieves a category information (body payload: category_id)
route.get("/category", async (req, res) => {
    try {
        const category_id = req.body.category_id;
        const menu = await menu_model.findById(category_id, {
            category_image: 1,
            category_name: 1,
        });
        res.status(200).json({
            success: true,
            category: menu,
        });
    } catch (err) {
        res.send(err);
    }
});

// create an item in a category (body payload: category_id, name, price, image, is_available)
route.post("/category", auth, async (req, res) => {
    const category = req.body.category_name;
    const image = req.body.category_image;

    console.log(req.body);

    const newCategory = new menu_model({
        category_name: category,
        category_image: image,
    });

    try {
        await newCategory.save();
        res.status(200).json({
            success: true,
            message: "Category added to menu",
            categories: await menu_model.find(),
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//update category name and image (body payload: category_id, category_name, category_image)
route.put("/category", auth, async (req, res) => {
    try {
        const category_id = req.body.category_id;
        const category_name = req.body.category_name;
        const category_image = req.body.category_image;

        // retrieve the category from the menu collection
        const menu = await menu_model.findById(category_id);

        // change the name and image of the category
        menu.category_name = category_name;
        menu.category_image = category_image;

        // save changes to the menu
        await menu.save();

        res.status(200).json({
            success: true,
            message: "Category updated",
            categories: await menu_model.find(),
        });
    } catch (err) {
        res.send(err);
    }
});

// deletes a category (body payload: category_id)
route.delete("/category", auth, async (req, res) => {
    try {
        const category_id = req.body.category_id;

        // delete the category from the menu collection
        await menu_model.findByIdAndDelete(category_id);

        res.status(200).json({
            success: true,
            message: "Category deleted",
            categories: await menu_model.find(),
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = route;
