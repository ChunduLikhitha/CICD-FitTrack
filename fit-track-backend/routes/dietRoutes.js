import express from "express";
import {
  getDietEntries,
  createDietEntry,
  updateDietEntry,
  deleteDietEntry,
} from "../controllers/dietController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getDietEntries);
router.post("/", createDietEntry);
router.put("/:id", updateDietEntry);
router.delete("/:id", deleteDietEntry);

export default router;
