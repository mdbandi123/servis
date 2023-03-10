const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const order_model = require("./models/order").order_model;
const menu_model = require("./models/menu").menu_model;
const tables_model = require("./models/tables").tables_model;

const order_route = require("./routes/order");
const menu_route = require("./routes/menu");
const order_items_route = require("./routes/order_items");
const menu_items_route = require("./routes/menu_items");
const upload_route = require("./routes/upload");
const images_route = require("./routes/images");
const tables_routes = require("./routes/tables");

const app = express();

app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.send({ message: "Hey it's Working!" });
});

app.use("/images", images_route);
app.use("/upload", upload_route);
app.use("/orders", order_route);
app.use("/menu", menu_route);
app.use("/order_items", order_items_route);
app.use("/menu_items", menu_items_route);
app.use("/tables", tables_routes);

// Listen for real time updates in orders collection based on order_id/session
io.on("connection", (socket) => {
    socket.on("sendOrderId", async (order_id) => {
        console.log("New connection from Table Order_Id: " + order_id);
        socket.join(order_id);
        try {
            const changeStream = order_model.watch();
            changeStream.on("change", async (data) => {
                try {
                    record = await order_model.find({ order_id: order_id });
 
                    const orderedList = [];
                    const cartList = [];
                    record.forEach((order) => {
                        order.ordered_items.forEach((item) => {
                            item.table_number = order.table_number;
                            orderedList.push(item);
                        });
                    });

                    record.forEach((order) => {
                        order.cart_items.forEach((item) => {
                            item.table_number = order.table_number;
                            cartList.push(item);
                        });
                    });

                    io.to(order_id).emit(`${order_id}-orders-update`, {
                        ordered_items: orderedList,
                        cart_items: cartList,
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


// Listen for real-time updates in the orders collection
const orders_stream = order_model.watch();
orders_stream.on("change", async () => {
  try {
    record = await order_model.find({ is_paid: false });
    const list = [];
    record.forEach((order) => {
        order.ordered_items.forEach((item) => {
            item.order_id = order.order_id;
        });
        list.push(order);
    });
    // Emit the list of unpaid orders to the client
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
                list.push({
                    ...item.toObject(),
                    category_name: menu.category_name,
                    category_image: menu.category_image,
                });
            });
        });

        io.emit("menu-update", { items: list });
    } catch (error) {
        console.log(error);
    }
});

//listen for real time updates in tables collection
const tables_stream = tables_model.watch();
tables_stream.on("change", async () => {
    try {
        record = await tables_model.find({});
        const list = [];
        record.forEach((table) => {
            list.push(table);
        });

        io.emit("tables-update", { tables: list });
    } catch (error) {
        console.log(error);
    }
});


server.listen(process.env.PORT || 8080, () => {
    console.log("Server started on port 8080");
});
