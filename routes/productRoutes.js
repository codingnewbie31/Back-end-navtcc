import express from "express";
import { upload } from "../config/multer.js";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const route = express.Router();

route.get("/get-products", getProducts);
route.get("/get-products/:productId", getSingleProduct);

route.post("/create-product", upload.single("image"), createProduct);
route.put("/update-product/:id", upload.single("image"), updateProduct);

route.delete("/delete-product/:id", deleteProduct);

export default route;