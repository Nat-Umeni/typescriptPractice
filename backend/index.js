const express = require("express");
const cors = require("cors");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    console.log('HIT THE BACKEND!')
})

app.listen(port, () => console.log(`Listening on port ${port}`));