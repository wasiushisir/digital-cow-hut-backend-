import express from "express";
import { createUserFromDb, getAllUsersFromDb } from "./user.controller";
const router = express.Router();

router.post("/create-user", createUserFromDb);
router.get("/", getAllUsersFromDb);

export default router;
