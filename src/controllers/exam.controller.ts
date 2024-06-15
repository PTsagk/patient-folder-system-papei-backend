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
  let user = await getUserByIdQuery(userInfo.id, "user");
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

export const getBiochemicalBloodExamById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const [row] = await sqlPool.query(
      `select * from biochemical_blood_exam where user_id = ?`,
      [id]
    );
    res.json(row).status(200);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};

export const getAllExamsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exams = await getUserExams(parseInt(id));
    res.status(200).send(exams);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};

async function getUserExams(userID: number) {
  const [row] = await sqlPool.query(
    `select date,blood_sugar,urea,creatinine,
    SGOT,SGPT,gamma_GT,cholesterol,triglycerides,cholesterol_HDL,
    cholesterol_LDL,albumin,total_bilirubin,direct_bilirubin,LDH,
    alkaline_phosphatase,potassium,sodium,total_calcium,iron,vitamin_B12,
    folic_acid,CRP_quantitative,ferritin,hydroxyvitamin_25_D
    from biochemical_blood_exam 
    where user_id = ?
    ORDER BY date ASC;`,
    [userID]
  );
  const [row2] = await sqlPool.query(
    `
    select date,thyroid_stimulating_hormone,triiodothyronine,
    free_thyroxine,anti_TPO,anti_TG,parathormone,calcitonin
    from hormonal_blood_exam
    where user_id = ?
    ORDER BY date ASC;`,
    [userID]
  );

  const [row3] = await sqlPool.query(
    `
    select date,white_bloodcells,neutrophils,lymphocytes,single_cells,eosinophils,basophils,
    red_blood_cells,hemoglobin,hematocrit,avg_red_cells_volume,avg_hemoglobin_content,
    avg_hemoglobin_density,red_cell_distribution_range,platelets,avg_platelets_volume,
    platelets_distribution_range,big_platelets
    FROM general_blood_exam
    WHERE user_id = ?
    ORDER BY date ASC;`,
    [userID]
  );
  //@ts-ignore
  console.log(row, row[0]);
  // @ts-ignore
  if (row.length > 0) {
    // @ts-ignore
    const updatedRows = row[0].map((row: any) => {
      row.date = new Date(row.date);
      return row[0];
    });
  }
  // @ts-ignore
  return row[0];
}
