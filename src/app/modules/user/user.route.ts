import express from "express";
import {
  createUserFromDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
} from "./user.controller";
const router = express.Router();

router.post("/create-user", createUserFromDb);
router.get("/:id", getSingleUserFromDb);
router.patch("/:id", updateUserFromDb);
router.delete("/:id", deleteUserFromDb);
router.get("/", getAllUsersFromDb);

export default router;
