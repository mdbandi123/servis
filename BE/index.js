const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const order_model = require("./models/order").order_model;
const menu_model = require("./models/menu").menu_model;

const order_route = require("./routes/order");
const menu_route = require("./routes/menu");
const order_items_route = require("./routes/order_items");
const menu_items_route = require("./routes/menu_items");

const app = express();

app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

mongoose.connect(
    "mongodb+srv://bossmd:bossmd@cluster0.rvllim4.mongodb.net/bossmd?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.get("/", (req, res) => {
    res.send({ message: "Hey it's Working!" });
});

app.use("/orders", order_route);
app.use("/menu", menu_route);
app.use("/order_items", order_items_route);
app.use("/menu_items", menu_items_route);

// Listen for real time updates in orders collection based on order_id/session
io.on("connection", (socket) => {
    console.log("New connection");
    socket.on("sendOrderId", async (order_id) => {
        console.log("Table Order_Id: " + order_id);
        socket.join(order_id);
        try {
            const changeStream = order_model.watch();
            changeStream.on("change", async (data) => {
                try {
                    record = await order_model.find({ order_id: order_id });
                    const list = [];
                    record.forEach((order) => {
                        order.ordered_items.forEach((item) => {
                            item.table_number = order.table_number;
                            list.push(item);
                        });
                    });

                    // emit the list to the client
                    console.log(list);
                    io.to(order_id).emit(`${order_id}-orders-update`, {
                        items: list,
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

//listen for real time updates in orders collection
const orders_stream = order_model.watch();
orders_stream.on("change", async () => {
    try {
        record = await order_model.find({});
        const list = [];
        record.forEach((order) => {
            order.ordered_items.forEach((item) => {
                item.table_number = order.table_number;
                list.push(item);
            });
        });
        // emit the list to the client
        io.emit("orders-update", { items: list });
    } catch (error) {
        console.log(error);
    }
});

//listen for real time updates in categories
const categories_stream = menu_model.watch();
categories_stream.on("change", async () => {
    try {
        record = await menu_model.find({});
        const list = [];
        record.forEach((menu) => {
            list.push(menu);
        });

        io.emit("categories-update", { items: list });
    } catch (error) {
        console.log(error);
    }
});

//listen for real time updates in menu collection
const menu_stream = menu_model.watch();
menu_stream.on("change", async () => {
    try {
        record = await menu_model.find({});
        const list = [];
        record.forEach((menu) => {
            menu.menu_item.forEach((item) => {
                list.push(item);
            });
        });

        io.emit("menu-update", { items: list });
    } catch (error) {
        console.log(error);
    }
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
