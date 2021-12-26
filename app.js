require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const { connect } = require("mongoose");

// middleware
app.use(express.json());

// Routes

app.get("/", (req, res) => {
	res.send('<h1>Store Api</h1><a href="/api/v1/products">Products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products routes

app.use(notFoundMiddleware);
app.get(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
