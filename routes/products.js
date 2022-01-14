const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	getAllProductsStatic,
	createProduct,
	patchProduct,
	getSingleProduct,
	deleteProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/static").get(getAllProductsStatic);
router
	.route("/:id")
	.get(getSingleProduct)
	.patch(patchProduct)
	.delete(deleteProduct);

module.exports = router;
