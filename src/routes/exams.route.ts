import express from "express";
import { authenticateDoctor } from "../controllers/authenticate.controller";
import {
  createBiochemicalBloodExam,
  createGeneralBloodExam,
  createHormonalBloodExam,
  getAllExamsByUserId,
  getBiochemicalBloodExamByUserId,
  getGeneralBloodExamByUserId,
  getHormonalBloodExamById,
} from "../controllers/exam.controller";

const router = express.Router();
router.route("/all").get(getAllExamsByUserId);
router.route("/general_exam").get(getGeneralBloodExamByUserId);
router
  .route("/general_exam")
  .all(authenticateDoctor)
  .post(createGeneralBloodExam);
router.route("/biochemical_exam").get(getBiochemicalBloodExamByUserId);
router
  .route("/biochemical_exam")
  .all(authenticateDoctor)
  .post(createBiochemicalBloodExam);
router.route("/hormonal_exam").get(getHormonalBloodExamById);
router
  .route("/hormonal_exam")
  .all(authenticateDoctor)
  .post(createHormonalBloodExam);

export default router;
