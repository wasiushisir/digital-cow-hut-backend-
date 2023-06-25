import express from "express";
import { createUserFromDb } from "./user.controller";
const router = express.Router();

router.post("/create-user", createUserFromDb);

export default router;
