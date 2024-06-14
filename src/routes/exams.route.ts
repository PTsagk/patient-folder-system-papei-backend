import express from "express";
import {
  getBiochemicalBloodExamById,
  createBiochemicalBloodExam,
} from "../controllers/exam.controller";

import { authenticateDoctor } from "../controllers/authenticate.controller";
const router = express.Router();
router.route("/get").all(authenticateDoctor).get(getBiochemicalBloodExamById);
router
  .route("/create")
  .all(authenticateDoctor)
  .post(createBiochemicalBloodExam);

export default router;
