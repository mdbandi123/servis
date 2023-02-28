const express = require("express");

const tables_model = require("../models/tables").tables_model;

const bodyParser = require("body-parser");

const route = express();
route.use(bodyParser.json());

// retrieves all tables
route.get("/", async (req, res) => {
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
route.post("/create", async (req, res) => {
    const table_name = req.body.table_name;

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
route.put("/update/:table_name", async (req, res) => {
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
route.delete("/delete/:table_name", async (req, res) => {
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