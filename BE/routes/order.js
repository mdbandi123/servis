const express = require("express");

const orders = require("../models/order").order_model;

const bodyParser = require("body-parser");
const qr = require("qr-image");

const route = express();
route.use(bodyParser.json());

// retrieves all orders
route.get("/", async (req, res) => {
    try {
        const order = await orders.find();
        res.status(200).json({
            success: true,
            orders: order,
        });
    } catch (err) {
        res.send(err);
    }
});

// creates a new order session for the table and returns a QR code (body payload: table_number)
route.post("/create/session", async (req, res) => {
    const order_id = createOrderId();
    const table_number = req.body.table_number;

    //make sure that the table_number is not in use and is_paid is false
    const table_in_use = await orders.findOne({
        table_number: table_number,
        is_paid: false,
    });

    if (table_in_use) {
        return res
            .status(400)
            .send({ error: "Table number is already in use." });
    }

    const order_session = new orders({
        table_number: table_number,
        session_start: new Date(),
        order_id: order_id,
    });

    try {
        await order_session.save();
        const qr_svg = qr.image(
            `http://localhost:5173/?order_id=${order_id}?table_number=${table_number}`,
            {
                type: "svg",
            }
        );

        res.type("svg");
        qr_svg.pipe(res);
    } catch (err) {
        res.status(500).send({ error: "Error creating order session" });
    }
});

// ends the session for the table (body payload: order_id)
route.put("/session", async (req, res) => {
    const order_id = req.body.order_id;

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