import express from "express";
import {
  createCategory,
  deleteCategory,
  getSingleCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const route = express.Router();

route.get("/category", getCategories);
route.get("/category/:id", getSingleCategory);
route.post("/category", createCategory);
route.put("/category/:id", updateCategory);
route.delete("/category/:id", deleteCategory);

export default route;