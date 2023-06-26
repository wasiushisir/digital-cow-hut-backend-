import express from "express";
import { createCowFromDb, getCowFromDb } from "./cow.controller";
const router = express.Router();

router.post("/create-cow", createCowFromDb);
router.get("/", getCowFromDb);

export default router;
