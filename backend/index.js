import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Book } from "./models/BookModel.js";
import connectToDB from "./db.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Properly called as a function now

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send("hello world");
});

app.use("/books",booksRoute);

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to the database', err);
});
