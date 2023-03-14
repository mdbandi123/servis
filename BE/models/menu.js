const mongoose = require("mongoose");

mongoose.pluralize(null);

const menu_item = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    is_available: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const menu = new mongoose.Schema({
    category_name: { type: String, required: true },
    category_image: { type: String, required: false },
    menu_item: [menu_item],
});

const menu_item_model = mongoose.model(
    "menu_item",
    menu_item,
    (collection = "menu")
);
const menu_model = mongoose.model("menu", menu, (collection = "menu"));

// export all functions
module.exports = {
    menu_model,
    menu_item_model,
};
