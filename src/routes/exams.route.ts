import express from "express";
import {
  getBiochemicalBloodExamByUserId,
  createBiochemicalBloodExam,
  getAllExamsByUserId,
  getHormonalBloodExamById,
  createHormonalBloodExam,
} from "../controllers/exam.controller";

const router = express.Router();
router.route("/all").get(getAllExamsByUserId);
router.route("/biochemical_exam").get(getBiochemicalBloodExamByUserId);
router.route("/hormonal_exam").get(getHormonalBloodExamById);
router.route("/biochemical_exam").post(createBiochemicalBloodExam);
router.route("/hormonal_exam").post(createHormonalBloodExam);

export default router;
