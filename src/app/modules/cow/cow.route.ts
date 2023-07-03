import express from "express";
import {
  createCowFromDb,
  deleteCowFromDb,
  getCowFromDb,
  getSingleCowFromDb,
  updateCowFromDb,
} from "./cow.controller";

const router = express.Router();

router.post("/create-cow", createCowFromDb);
router.get("/:id", getSingleCowFromDb);
router.patch("/:id", updateCowFromDb);
router.delete("/:id", deleteCowFromDb);
router.get("/", getCowFromDb);

export default router;
