const express = require("express");
const mongoose = require("mongoose");

const menu_model = require("../models/menu").menu_model;
const order_model = require("../models/order").order_model;
const ordered_item = require("../models/order").ordered_item_model;

const route = express();
const bodyParser = require("body-parser");

route.use(bodyParser.json());

// retrieves all items on ALL tables including the table number
route.get("/", async (req, res) => {
    try {
        const order = await order_model.find();
        if (!order) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }
        const items = [];
        order.forEach((order) => {
            order.ordered_items.forEach((item) => {
                item.table_number = order.table_number;
                items.push(item);
            });
        });
        res.status(200).json({
            success: true,
            items: items,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// retrieves all items in the order/cart of the CURRENT session (body payload: order_id)
route.post("/items", async (req, res) => {
    const order_id = req.body.order_id;
    try {
        record = await order_model.find({ order_id: order_id });

        if (!record) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }

        const list = [];
        record.forEach((order) => {
            order.ordered_items.forEach((item) => {
                item.table_number = order.table_number;
                list.push(item);
            });
        });

        res.status(200).json({
            success: true,
            items: list,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// adds an item to an ordered_items list in the CURRENT session (body payload: order_id, item_id, quantity)
route.post("/item", async (req, res) => {
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;
    const quantity = req.body.quantity;

    // find the item in the menu collection inside the menu_item array of objects with the _id
    const menu = await menu_model.findOne({
        menu_item: { $elemMatch: { _id: mongoose.Types.ObjectId(item_id) } },
    });

    if (!menu) {
        return res.status(500).json({
            message: "not found in menu",
        });
    }

    // find the item in the menu_item array of objects using the id
    const item = menu.menu_item.find((item) => item._id.toString() === item_id);

    // if the item is not found in the menu_item array of objects
    if (!item) {
        return res.status(500).json({
            message: "Item not found in menu",
        });
    }

    // create a new order
    const order = new ordered_item({
        item_name: item.name,
        item_price: item.price,
        item_category: menu.category_name,
        quantity: quantity,
        total_price: item.price * quantity,
        time_ordered: new Date(),
    });

    try {
        // add the order to the order collection
        await order_model.findOneAndUpdate(
            { order_id: order_id },
            { $push: { ordered_items: order } },
            { new: true }
        );

        res.status(200).json({
            message: `Item has been added to the order.`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding item to order",
            error: error,
        });
    }
});

// update the status of an item in the order/cart of the CURRENT session (body payload: order_id, item_id, status)
route.put("/status", async (req, res) => {
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;
    const status = req.body.status;

    try {
        // update the status of the item in the order collection
        await order_model.findOneAndUpdate(
            { order_id: order_id, "ordered_items._id": item_id },
            { $set: { "ordered_items.$.status": status } },
            { new: true }
        );

        const modOrderCollection = await order_model.find();

        // return the modified order collection
        res.status(200).json({
            message: `Item status has been updated.`,
            order: modOrderCollection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating item status",
            error: error,
        });
    }
});

//remove the item from the order/cart of the CURRENT session (body payload: order_id, item_id)
route.delete("/item", async (req, res) => {
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;

    try {
        // remove the order from the order collection
        await order_model.findOneAndUpdate(
            { order_id: order_id },
            { $pull: { ordered_items: { _id: item_id } } },
            { new: true }
        );

        // return ordered_items array based from order_id
        const order = await order_model.findOne({ order_id: order_id });
        const orderedItems = order.ordered_items;

        // return the modified order collection
        res.status(200).json({
            message: `Item has been removed from the order.`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error removing item from order",
            error: error,
        });
    }
});

module.exports = route;
