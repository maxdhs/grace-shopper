require("dotenv").config();
const PORT = process.env.PORT || 3001;

const express = require("express");
const apiRouter = require("./api");

const client = require("./db/index");

const app = express();

app.use(express.json());

app.use(express.static("build"));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT);
  client.connect();
});
