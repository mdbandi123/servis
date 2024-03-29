const express = require("express");
const auth = require("../middlewares/auth");

const tables_model = require("../models/tables").tables_model;

const bodyParser = require("body-parser");

const route = express();
route.use(bodyParser.json());

// retrieves all tables
route.get("/", auth, async (req, res) => {
    try {
        const table = await tables_model.find();
        res.status(200).json({
            success: true,
            tables: table,
        });
    } catch (err) {
        res.send(err);
    }
});

// create a new table
route.post("/create", auth, async (req, res) => {
    const table_name = req.body.table_name;

    if (!table_name) {
        res.status(400).json({
            success: false,
            message: "Table name is required",
        });
        return;
    }

    // check if table name already exists
    const table_name_exists = await tables_model.findOne({
        table_name: table_name,
    });

    if (table_name_exists) {
        res.status(400).json({
            success: false,
            message: "Table name already exists",
        });
        return;
    }

    const table = new tables_model({
        table_name: table_name,
    });

    try {
        await table.save();
        res.status(200).json({
            success: true,
            message: "Table created",
        });
    } catch (err) {
        res.send(err);
    }
});

// update a table
route.put("/update/:table_name", auth, async (req, res) => {
    const table_name = req.params.table_name;
    const new_table_name = req.body.new_table_name;

    try {
        await tables_model.updateOne(
            { table_name: table_name },
            { table_name: new_table_name }
        );
        res.status(200).json({
            success: true,
            message: "Table updated",
        });
    } catch (err) {
        res.send(err);
    }
});

// delete a table
route.delete("/delete/:table_name", auth, async (req, res) => {
    const table_name = req.params.table_name;

    try {
        await tables_model.deleteOne({ table_name: table_name });
        res.status(200).json({
            success: true,
            message: "Table deleted",
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = route;
