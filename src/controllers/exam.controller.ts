import { Request, Response } from "express";
import { sqlPool } from "../mysqlPool";
import { createNewUser, getUserByIdQuery } from "./user.controller";
export const createBiochemicalBloodExam = async (
  req: Request,
  res: Response
) => {
  try {
    await createNewBiochemicalBloodExam(req.body.userInfo, req.body.examInfo);
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};

async function createNewBiochemicalBloodExam(userInfo: any, examInfo: any) {
  let user = await getUserByIdQuery(userInfo.id);
  if (!user) {
    user = await createNewUser(userInfo);
  }
  const [row] = await sqlPool.query(
    `insert into biochemical_blood_exam (date,doctor_id,user_id,blood_sugar,urea,creatinine, SGOT,SGPT,gamma_GT,cholesterol,triglycerides,cholesterol_HDL,cholesterol_LDL,albumin,total_bilirubin,direct_bilirubin,LDH,alkaline_phosphatase,potassium,sodium,total_calcium,iron,vitamin_B12,folic_acid,CRP_quantitative,ferritin,hydroxyvitamin_25_D) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      examInfo.date,
      examInfo.doctor_id,
      user.id,
      examInfo.blood_sugar,
      examInfo.urea,
      examInfo.creatinine,
      examInfo["SGOT"],
      examInfo["SGPT"],
      examInfo.gamma_GT,
      examInfo.cholesterol,
      examInfo.triglycerides,
      examInfo.cholesterol_HDL,
      examInfo.cholesterol_LDL,
      examInfo.albumin,
      examInfo.total_bilirubin,
      examInfo.direct_bilirubin,
      examInfo["LDH"],
      examInfo.alkaline_phosphatase,
      examInfo.potassium,
      examInfo.sodium,
      examInfo.total_calcium,
      examInfo.iron,
      examInfo.vitamin_B12,
      examInfo.folic_acid,
      examInfo.CRP_quantitative,
      examInfo.ferritin,
      examInfo.hydroxyvitamin_25_D,
    ]
  );
  return row;
}
