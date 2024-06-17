import express from "express";
import {
  getBiochemicalBloodExamByUserId,
  createBiochemicalBloodExam,
  getAllExamsByUserId,
  getHormonalBloodExamById,
  createHormonalBloodExam,
  getGeneralBloodExamByUserId,
  createGeneralBloodExam,
} from "../controllers/exam.controller";

const router = express.Router();
router.route("/all").get(getAllExamsByUserId);
router.route("/biochemical_exam").get(getBiochemicalBloodExamByUserId);
router.route("/biochemical_exam").post(createBiochemicalBloodExam);
router.route("/hormonal_exam").get(getHormonalBloodExamById);
router.route("/hormonal_exam").post(createHormonalBloodExam);
router.route("/general_exam").get(getGeneralBloodExamByUserId);
router.route("/general_exam").post(createGeneralBloodExam);

export default router;
