import express from "express";
import {
  createCurrency,
  deleteCurrency,
  getSingleCurrency,
  getCurrencies,
  updateCurrency,
} from "../controllers/currencyController.js";

const route = express.Router();

route.get("/currency", getCurrencies);
route.get("/currency/:id", getSingleCurrency);
route.post("/currency", createCurrency);
route.put("/currency/:id", updateCurrency);
route.delete("/currency/:id", deleteCurrency);

export default route;