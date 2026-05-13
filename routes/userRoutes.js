import express from "express";
import {
  createUser,
  deleteUser,
  getSingleUsers,
  getUsers,
  logInUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticateUser, authorizeAdmin } from "../auth/authentication.js";

const route = express.Router();

route.post("/login",logInUser);

route.post("/user", createUser);

route.get("/user",authenticateUser, authorizeAdmin,getUsers);

route.get("/user/:id", authenticateUser, getSingleUsers);

route.put("/user/:id", authenticateUser, updateUser);

route.delete("/user/:id", authenticateUser, deleteUser);

export default route;