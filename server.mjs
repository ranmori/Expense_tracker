

import React from "react";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app= express();
const Port= process.env.Port;
const mongo_url= process.env.mongo_url;

const expenseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    description: {
        type: String,
        required: false,
    },
});
// Create the model
const Expense = mongoose.model("Expense", expenseSchema);





app.listen(Port, {
    console.log("listening to port")
})
