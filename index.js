require("dotenv").config();
const express = require("express");
const { client } = require("./db");

let PORT = process.env.PORT || 3001;

const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

app.use(express.json());

const jwt = require("jsonwebtoken");

const { getUserByUsername } = require("./db/users");

app.use(async (req, res, next) => {
	if (!req.headers.authorization) {
		return next();
	}
	const auth = req.headers.authorization.split(" ")[1];
	const _user = jwt.decode(auth, process.env.SECRET_KEY);

	if (!_user) {
		return next();
	}

	const user = await getUserByUsername(_user.username);
	req.user = user;

	next();
});

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
	res.status(400).send({
		name: err.name,
		message: err.message,
	});
});

app.listen(PORT, () => {
	console.log("server is up!", PORT);

	client.connect();
});
