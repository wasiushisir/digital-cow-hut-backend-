import express from "express";
import { createOrderFromDb, getOrdersFromDb } from "./orders.controller";

const router = express.Router();

router.post("/create-order", createOrderFromDb);
router.get("/", getOrdersFromDb);

export default router;
