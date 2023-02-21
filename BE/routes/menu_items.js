const express = require("express");

const menu_items = require("../models/menu").menu_item_model;
const menu_model = require("../models/menu").menu_model;

const route = express();
const bodyParser = require("body-parser");

route.use(bodyParser.json());

// retrieve all of the menu items
route.get("/", async (req, res) => {
    try {
        const menu = await menu_model.find();
        const combinedMenu = [];
        for (const item of menu) {
            for (const menuItem of item.menu_item) {
                combinedMenu.push({
                    name: menuItem.name,
                    price: menuItem.price,
                    image: menuItem.image,
                    is_available: menuItem.is_available,
                    _id: menuItem._id,
                    category_name: item.category_name,
                });
            }
        }
        res.status(200).json({
            success: true,
            items: combinedMenu,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// create a new item under a category (body payload: category_name, name, price, image, is_available)
route.post("/item", async (req, res) => {
    const category_name = req.body.category_name;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const is_available = req.body.is_available;

    const newMenuItem = new menu_items({
        name: name,
        price: price,
        image: image,
        is_available: is_available,
    });

    try {
        await menu_model.findOneAndUpdate(
            { category_name: category_name },
            { $push: { menu_item: newMenuItem } },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Item added to menu",
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

// retrieve all items under a category (body payload: category_name)
route.get("/items", async (req, res) => {
    const category_name = req.body.category_name;
    try {
        const menu = await menu_model.find({ category_name: category_name });
        const items = menu.map((m) => m.menu_item).flat();
        res.status(200).json({
            success: true,
            items: items,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// get a specific item information (body payload: item_id)
route.get("/item", async (req, res) => {
    try {
        const item_id = req.body.item_id;

        // retrieve the item from the menu collection
        const menu = await menu_model.findOne({ "menu_item._id": item_id });
        const item = menu.menu_item.find((i) => i._id.toString() === item_id);

        res.status(200).json({
            success: true,
            message: "Item retrieved",
            item: item,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// update item availability using item_id (body payload: item_id, is_available)
route.put("/availability", async (req, res) => {
    try {
        const item_id = req.body.item_id;
        const is_available = req.body.is_available;

        // retrieve the item from the menu collection
        const menu = await menu_model.findOne({ "menu_item._id": item_id });
        const item = menu.menu_item.find((i) => i._id.toString() === item_id);

        // change the availability of the item
        item.is_available = is_available;

        // save changes to the menu
        await menu.save();

        res.status(200).json({
            success: true,
            message: "Item availability updated",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// update the item (body payload: item_id, name, price, unit_price, image, category)
route.put("/item", async (req, res) => {
    try {
        const item_id = req.body.item_id;
        const name = req.body.name;
        const price = req.body.price;
        // const unit_price = req.body.unit_price;
        const image = req.body.image;
        const category = req.body.category;
        const is_available = req.body.is_available;

        // retrieve the item from the menu collection
        const menu = await menu_model.findOne({ "menu_item._id": item_id });
        const item = menu.menu_item.find((i) => i._id.toString() === item_id);

        // change the item details
        item.name = name;
        item.price = price;
        // item.unit_price = unit_price;
        item.image = image;
        item.category = category;
        item.is_available = is_available;

        // save changes to the menu
        await menu.save();

        res.status(200).json({
            success: true,
            message: "Item details updated",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// deletes an item from a category in the menu (body payload: item_id)
route.delete("/item", async (req, res) => {
    try {
        const item_id = req.body.item_id;

        // retrieve the item from the menu collection
        const menu = await menu_model.findOne({ "menu_item._id": item_id });
        const item = menu.menu_item.find((i) => i._id.toString() === item_id);

        // remove the item from the menu
        menu.menu_item.remove(item);

        // save changes to the menu
        await menu.save();

        res.status(200).json({
            success: true,
            message: "Item deleted",
            items: menu.menu_item,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = route;
