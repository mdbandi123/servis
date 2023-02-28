const mongoose = require("mongoose");

mongoose.pluralize(null);

const tables = new mongoose.Schema({
    table_name: { type: String, required: true },
});

const tables_model = mongoose.model("tables", tables, (collection = "tables"));

// export all functions
module.exports = {
    tables_model,
};
