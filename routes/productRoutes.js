import express from "express";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get-products", getProducts);
router.get("/get-products/:productId", getSingleProduct);

router.post("/create-product", createProduct);
router.put("/update-product/:id", updateProduct);

router.delete("/delete-product/:id", deleteProduct);

export default router;