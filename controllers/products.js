const Product = require("../models/product");
const redis = require("../config/redis");

/* TESTING ROUTE */
const getAllProductsStatic = async (req, res) => {
	const search = "ab";

	const products = await Product.find({ price: { $gte: 30 } }).sort("price");

	res.status(200).json({ products, nbHits: products.length });
};

/* MAIN ROUTES */
const getSingleProduct = async (req, res) => {
	try {
		const product = await redis.get(`allProducts.${req.params.id}`);
		if (product) {
			let sendProduct = JSON.parse(product);
			return res.status(200).send({ sendProduct, redis: true });
		} else {
			try {
				const getProduct = await Product.findById(req.params.id);
				await redis.set(
					`allProducts.${req.params.id}`,
					JSON.stringify(getProduct)
				);
				return res.status(200).send({ getProduct, redis: false });
			} catch (err) {
				console.log(err);
			}
		}
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err.message });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const { featured, company, name, sort, fields, numericFilters } = req.query;

		const queryObject = {};

		if (featured) {
			queryObject.featured = featured === "true" ? true : false;
		}

		if (company) {
			queryObject.company = company;
		}
		if (name) {
			queryObject.name = { $regex: name, $options: "i" };
		}
		if (numericFilters) {
			const operatorMap = {
				">": "$gt",
				">=": "$gte",
				"=": "$eq",
				"<": "$lt",
				"<=": "$lte",
			};

			const regEx = /\b(<|>|>=|=|<|<=\b)/g;
			let filters = numericFilters.replace(
				regEx,
				(match) => `-${operatorMap[match]}-`
			);
			const options = ["price", "rating"];
			filters = filters.split(",").forEach((item) => {
				const [field, operator, value] = item.split("-");
				if (options.includes(field)) {
					queryObject[field] = { [operator]: Number(value) };
				}
			});
		}

		let result = Product.find(queryObject);

		if (sort) {
			const sortList = sort.split(",").join(" ");
			result = result.sort(sortList);
		} else {
			result = result.sort("createdAt");
		}

		if (fields) {
			const fieldsList = fields.split(",").join(" ");
			result = result.select(fieldsList);
		}

		// Pagination Part
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		result = result.skip(skip).limit(limit);

		const products = await result;
		res.status(200).json({ products, nbHits: products.length });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err.message });
	}
};

// Create Route
const createProduct = async (req, res) => {
	try {
		// redis.get(`allProducts`, async function (err, products) {
		const product = await Product.create(req.body);

		await redis.set(`allProducts.${product._id}`, JSON.stringify(product));
		const products = await redis.get(`allProducts`);
		if (products) {
			const parsedProducts = JSON.parse(products);
			const newProducts = [...parsedProducts, product];
			await redis.set(`allProducts`, JSON.stringify(newProducts));
		} else {
			const insertProducts = await Product.find().lean().exec();
			try {
				await redis.set(`allProducts`, JSON.stringify(insertProducts));
			} catch (err) {
				console.log(err);
			}
		}
		return res.status(201).send(product);
		// });
	} catch (err) {
		console.log("Error", err);
		return res.status(500).send({ error: err.message });
	}
};

// Patch Route
const patchProduct = async (req, res) => {
	try {
		const oneProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		await redis.set(`allProducts.${req.params.id}`, JSON.stringify(oneProduct));

		const products = await Product.find().lean().exec();
		await redis.set("allProducts", JSON.stringify(products));

		return res.status(201).send(oneProduct);
	} catch (err) {
		console.log("Error", err);
		return res.status(500).send({ error: err.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		// redis.get(`allProducts.${req.params.id}`, async function (err, product) {
		const jsonProduct = await redis.get(`allProducts.${req.params.id}`);
		const product = JSON.parse(jsonProduct);
		if (product) {
			redis.del(`allProducts.${req.params.id}`);
		}
		const products = await Product.find().lean().exec();
		await redis.set(`allProducts`, JSON.stringify(products));
		const delProduct = await Product.findByIdAndDelete(req.params.id);
		return res.status(200).send(delProduct);
		// });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err.message });
	}
};
module.exports = {
	getAllProducts,
	getAllProductsStatic,
	getSingleProduct,
	createProduct,
	patchProduct,
	deleteProduct,
};
