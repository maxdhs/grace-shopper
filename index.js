require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");
const client = require("./db/client");

let PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

// app.use(express.static("build"));

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/build/index.html");
// });

app.listen(PORT, () => {
    console.log("Server is up on port: " + PORT);
    client.connect();
});
