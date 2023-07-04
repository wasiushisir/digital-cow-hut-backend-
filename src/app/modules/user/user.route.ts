import express from "express";
import {
  createUserFromDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
} from "./user.controller";
const router = express.Router();

router.post("/create-user", createUserFromDb);
router.get("/:id", getSingleUserFromDb);
router.delete("/:id", deleteUserFromDb);
router.get("/", getAllUsersFromDb);

export default router;
