import express from "express";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getActivities);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
