const express = require("express");
const auth = require('../middlewares/auth');

const orders = require("../models/order").order_model;

const bodyParser = require("body-parser");
const qr = require("qr-image");

const route = express();
route.use(bodyParser.json());

// retrieves all orders where is_paid is false
route.get("/", auth, async (req, res) => {
    try {
        const order = await orders.find({ is_paid: false });
        if (!order) {
            return res
                .status(404)
                .json({ success: false, message: "Orders not found" });
        }
        const updatedOrders = order.map(order => {
            const updatedOrderedItems = order.ordered_items.map(item => {
                item.order_id = order.order_id;
                return item;
            });
            order.ordered_items = updatedOrderedItems;
            return order;
        });
        res.status(200).json({ success: true, orders: updatedOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



// check if the order_id is existing and is_paid is false
route.get("/:order_id", async (req, res) => {
    const order_id = req.params.order_id;

    const order_session = await orders.findOne({
        order_id: order_id,
        is_paid: false,
    });

    if (!order_session) {
        return res.status(404).json({
            success: false,
            message: "Order session not found",
        });
    }

    res.status(200).json({
        success: true,
        session: order_session,
        message: "Order session found",
    });
});


// creates a new order session for the table and returns a QR code (body payload: table_number)
route.post("/create/:table_number", auth, async (req, res) => {
    const order_id = createOrderId();
    const table_number = req.params.table_number;

    //make sure that the table_number is not in use and is_paid is false
    const table_in_use = await orders.findOne({
        table_number: table_number,
        is_paid: false,
    });

    console.log(table_in_use);

    if (table_in_use) {
        return res
            .status(200)
            .send({ 
            message: "order exists",
            url: "https://servis-henna.vercel.app/?order_id=" + table_in_use.order_id
        });
    }

    const order_session = new orders({
        table_number: table_number,
        session_start: new Date(),
        order_id: order_id,
    });

    try {
        await order_session.save();

        res.status(200).send({
            message: "Order session created",
            url: "https://servis-henna.vercel.app/?order_id=" + order_id
        });
    } catch (err) {
        res.status(500).send({ error: "Error creating order session" });
    }
});

// set the billed_out to true for the order session (body payload: order_id)
route.put("/billed_out/:order_id", async (req, res) => {
    const order_id = req.params.order_id;

    // check if the order_id is valid and is_paid is true then return session ended alredy
    const order_session = await orders.findOne({
        order_id: order_id,
        is_paid: true,
    });

    if (order_session) {
        return res.status(400).send({ error: "Session already ended" });
    }

    try {
        await orders.findOneAndUpdate(
            { order_id: order_id },
            { billed_out: true }
        );
        res.status(200).send({ message: "Billed out" });
    } catch (err) {
        res.status(500).send({ error: "Error billing out" });
    }
});


// ends the session for the table (body payload: order_id)
route.put("/session/:order_id", auth, async (req, res) => {
    const order_id = req.params.order_id;

    // check if the order_id is valid and is_paid is true then return session ended alredy
    const order_session = await orders.findOne({
        order_id: order_id,
        is_paid: true,
    });

    if (order_session) {
        return res.status(400).send({ error: "Session already ended" });
    }

    try {
        await orders.findOneAndUpdate(
            { order_id: order_id },
            { session_end: new Date(), is_paid: true }
        );
        res.status(200).send({ message: "Session ended" });
    } catch (err) {
        res.status(500).send({ error: "Error ending session" });
    }
});

//function to generate a random order_id
const createOrderId = () => {
    let result = "";
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

module.exports = route;
