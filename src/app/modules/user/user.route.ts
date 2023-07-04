import express from "express";
import {
  createUserFromDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
} from "./user.controller";
const router = express.Router();

router.post("/create-user", createUserFromDb);
router.get("/:id", getSingleUserFromDb);
router.get("/", getAllUsersFromDb);

export default router;
