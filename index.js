require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");

let PORT = process.env.PORT || 3001;

const app = express();

app.use("/api", apiRouter);

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT);
});
