const mongoose = require("mongoose");

mongoose.pluralize(null);

const tables = new mongoose.Schema({
    table_name: { type: String, required: true },
    in_use: { type: Boolean, required: true, default: false },
});

const tables_model = mongoose.model("tables", tables, (collection = "tables"));

// export all functions
module.exports = {
    tables_model,
};
