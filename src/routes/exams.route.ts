import express from "express";
import {
  authenticateDoctor,
  authenticateController,
} from "../controllers/authenticate.controller";
import {
  createBiochemicalBloodExam,
  createGeneralBloodExam,
  createHormonalBloodExam,
  getAllExamsByUserId,
  getBiochemicalBloodExamByUserId,
  getGeneralBloodExamByUserId,
  getHormonalBloodExamById,
  getBiochemicalBloodByExamId,
  getGeneralBloodByExamId,
  getHormonalBloodByExamId,
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
router
  .route("/general_exam_by_id")
  .all(authenticateController)
  .get(getGeneralBloodByExamId);
router
  .route("/biochemical_exam_by_id")
  .all(authenticateController)
  .get(getBiochemicalBloodByExamId);
router
  .route("/hormonal_exam_by_id")
  .all(authenticateController)
  .get(getHormonalBloodByExamId);
export default router;
