import express from "express";
import { createOrderFromDb } from "./orders.controller";

const router = express.Router();

router.post("/create-order", createOrderFromDb);

export default router;
