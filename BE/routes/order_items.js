const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");

const menu_model = require("../models/menu").menu_model;
const order_model = require("../models/order").order_model;
const ordered_item = require("../models/order").ordered_item_model;
const cart_item = require("../models/order").cart_item_model;

const route = express();
const bodyParser = require("body-parser");
const { cart_item_model } = require("../models/order");

route.use(bodyParser.json());

// retrieves all items on ALL tables including the table number
route.get("/", auth, async (req, res) => {
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

// retrieves all items in the cart of the CURRENT session (body payload: order_id)
route.get("/cart/:order_id", async (req, res) => {
    const order_id = req.params.order_id;
    try {
        record = await order_model.find({ order_id: order_id });

        if (!record) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }

        const list = [];
        record.forEach((order) => {
            order.cart_items.forEach((item) => {
                item.table_number = order.table_number;
                item.order_id = order.order_id;
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

//retrieve all items on all tables where is_paid is true
route.get("/archive", auth, async (req, res) => {
    try {
        const order = await order_model.find({ is_paid: true });
        if (!order) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }
        const items = [];
        order.forEach((order) => {
            order.ordered_items.forEach((item) => {
                item.table_number = order.table_number;
                item.order_id = order.order_id;
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

// retrieves all items in the order of the CURRENT session (body payload: order_id)
route.get("/items/:order_id", async (req, res) => {
    const order_id = req.params.order_id;
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
                item.order_id = order.order_id;
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

// adds an item to cart list in the CURRENT session (body payload: order_id, item_id, quantity)
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
    const item = menu.menu_item.find((menuItem) => menuItem._id.toString() === item_id);
  
    // if the item is not found in the menu_item array of objects
    if (!item) {
      return res.status(500).json({
        message: "Item not found in menu",
      });
    }
  
    const order = await order_model.findOne({ order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  
    const existingItemIndex = order.cart_items.findIndex(
      (cartItem) => cartItem.item_name === item.name
    );
  
    try {
      if (existingItemIndex === -1) {
        // create a new cart item
        const newItem = new cart_item_model({
          item_id: item._id,
          item_name: item.name,
          item_price: item.price,
          item_category: menu.category_name,
          quantity: quantity,
          item_image: item.image,
        });
  
        // add the order to the order collection
        await order_model.findOneAndUpdate(
          { order_id: order_id },
          { $push: { cart_items: newItem } },
          { new: true }
        );
  
        return res.status(200).json({
          message: `Item has been added to the cart.`,
        });
      } else {
        // add 1 to the existing item's quantity
        const existingItem = order.cart_items[existingItemIndex];
        existingItem.quantity += 1;

        await order.save();
  
        return res.status(200).json({
          message: `Quantity of item in cart has been increased by 1.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error adding item to cart",
        error: error,
      });
    }
  });
  

// update the status of an item in the order of the CURRENT session (body payload: order_id, item_id, status)
route.put("/status", auth, async (req, res) => {
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

// update the quantity of an item in the cart of the CURRENT session (body payload: order_id, item_id, quantity)
route.put("/quantity", async (req, res) => {
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;
    const quantity = req.body.quantity;

    try {
        if (quantity < 1) {
            return res.status(400).json({
            message: "Item quantity cannot be less than 1",
            });
            }
            
        // update the quantity of the item in the order collection
        await order_model.findOneAndUpdate(
            { order_id: order_id, "cart_items._id": item_id },
            { $set: { "cart_items.$.quantity": quantity } },
            { new: true }
        );

        // return the modified order collection
        res.status(200).json({
            message: `Item quantity has been updated.`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating item quantity",
            error: error,
        });
    }
});

// put all cart_items to ordered_items in the CURRENT session (body payload: order_id)
route.put("/checkout", async (req, res) => {
    const order_id = req.body.order_id;

    try {
        const order = await order_model.findOne({ order_id });
    
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        const currentTime = new Date();
        order.cart_items = order.cart_items.map((item) => ({
        ...item,
        time_ordered: currentTime,
        }));
        
        order.ordered_items = [...order.ordered_items, ...order.cart_items];
        order.cart_items = [];
    
        await order.save();
    
        return res.status(200).json({ message: "Cart items moved to ordered items" });
      } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
      }
});

//remove the item from the cart of the CURRENT session (body payload: order_id, item_id)
route.delete("/item", async (req, res) => {
    const order_id = req.body.order_id;
    const item_id = req.body.item_id;

    try {
        // remove the order from the order collection
        await order_model.findOneAndUpdate(
            { order_id: order_id },
            { $pull: { cart_items: { _id: item_id } } },
            { new: true }
        );

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
