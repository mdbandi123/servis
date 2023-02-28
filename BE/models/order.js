const mongoose = require("mongoose");

mongoose.pluralize(null);

const ordered_item = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    item_name: {
        type: String,
        required: true,
    },
    item_price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: { type: String, default: "pending", required: true },
    time_ordered: { type: Date, required: true },
    table_number: { type: Number, required: false },
    item_category: { type: String, required: true },
    item_image: { type: String, required: true },
    order_id: { type: String, required: false },
});

const orders = new mongoose.Schema({
    table_number: { type: Number, required: true },
    is_paid: { type: Boolean, required: true, default: false },
    ordered_items: [ordered_item],
    session_end: { type: Date, required: false },
    session_start: { type: Date, required: true },
    order_id: { type: String, required: true },
});

const order_model = mongoose.model("orders", orders, (collection = "orders"));
const ordered_item_model = mongoose.model(
    "ordered_item",
    ordered_item,
    (collection = "orders")
);

// export all functions
module.exports = {
    order_model,
    ordered_item_model,
};
