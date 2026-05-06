import express from "express";
import {
  createUser,
  deleteUser,
  getSingleUsers,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
const route = express.Router();

route.get("/user", getUsers);
route.get("/user/:id", getSingleUsers);
route.post("/user", createUser);
route.put("/user/:id", updateUser);
route.delete("/user/:id", deleteUser);

export default route;