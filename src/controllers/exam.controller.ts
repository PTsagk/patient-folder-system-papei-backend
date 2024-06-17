import { Request, Response } from "express";
import { IBiochemicalBloodRequest } from "../models/biochemical_blood_request";
import {
  IGeneralBloodRequest,
  checkAllBloodTestResults,
} from "../models/general_blood_request";
import { IHormonalBloodRequest } from "../models/hormonal_blood_request";
import { IUserInfoRequest } from "../models/user_info_request";
import { sqlPool } from "../mysqlPool";
import { createNewUser, getUserByIdQuery } from "./user.controller";

export const createBiochemicalBloodExam = async (
  req: Request,
  res: Response
) => {
  try {
    if (!!!req.body.examInfo) {
      throw new Error("Missing hormonal exam info");
    }
    await createNewBiochemicalBloodExam(
      req.body.userInfo,
      req.body.examInfo,
      res.locals.id
    );
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};

async function createNewBiochemicalBloodExam(
  userInfo: IUserInfoRequest,
  examInfo: IBiochemicalBloodRequest,
  doctor_id: number
) {
  const date = new Date().getTime();
  let user;
  if (userInfo.id) {
    user = await getUserByIdQuery(userInfo.id, "user");
  }
  if (!user) {
    user = await createNewUser({ ...userInfo, doctor_id: doctor_id });
  }
  const [row] = await sqlPool.query(
    `insert into biochemical_blood_exam (date,user_age,doctor_id,user_id,blood_sugar,urea,creatinine,SGOT,SGPT,gamma_GT,cholesterol,triglycerides,cholesterol_HDL,cholesterol_LDL,albumin,total_bilirubin,direct_bilirubin,LDH,alkaline_phosphatase,potassium,sodium,total_calcium,iron,vitamin_B12,folic_acid,CRP_quantitative,ferritin,hydroxyvitamin_25_D) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      date,
      userInfo.age,
      doctor_id,
      user.insertId,
      examInfo.blood_sugar,
      examInfo.urea,
      examInfo.creatinine,
      examInfo.SGOT,
      examInfo.SGPT,
      examInfo.gamma_GT,
      examInfo.cholesterol,
      examInfo.triglycerides,
      examInfo.cholesterol_HDL,
      examInfo.cholesterol_LDL,
      examInfo.albumin,
      examInfo.total_bilirubin,
      examInfo.direct_bilirubin,
      examInfo.LDH,
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

export const getBiochemicalBloodExamByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.query;
    const [row] = await sqlPool.query(
      `select * from biochemical_blood_exam where user_id = ? order by date desc`,
      [id]
    );
    //@ts-ignore
    if (row.length > 0) {
      //@ts-ignore
      let modifiedDataArray = row.map((obj) => {
        return {
          ...obj,
          date: new Date(obj.date),
        };
      });
      res.json(modifiedDataArray).status(200);
      return;
    }
    res.json(row).status(200);
    return;
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};

export const getAllExamsByUserId = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.query;
    const exams = await getUserExams(parseInt(id));
    res.status(200).json(exams);
    return;
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};
// hormonal blood exams
export const createHormonalBloodExam = async (req: Request, res: Response) => {
  try {
    const { userInfo, examInfo } = req.body;
    console.log(userInfo, examInfo, !!!examInfo);
    if (!!!examInfo) {
      throw new Error("Missing hormonal exam info");
    }
    await createNewHormonalBloodExam(userInfo, examInfo, res.locals.id);
    res.json("OK").status(200);
    return;
  } catch (error) {
    // console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};

async function getUserExams(userID: number) {
  const [row] = await sqlPool.query(
    `SELECT date,blood_sugar,urea,creatinine,
    SGOT,SGPT,gamma_GT,cholesterol,triglycerides,cholesterol_HDL,
    cholesterol_LDL,albumin,total_bilirubin,direct_bilirubin,LDH,
    alkaline_phosphatase,potassium,sodium,total_calcium,iron,vitamin_B12,
    folic_acid,CRP_quantitative,ferritin,hydroxyvitamin_25_D
    from biochemical_blood_exam 
    where user_id = ?
    `,
    [userID]
  );
  const [row2] = await sqlPool.query(
    `
    select date,thyroid_stimulating_hormone,triiodothyronine,
    free_thyroxine,anti_TPO,anti_TG,parathormone,calcitonin
    from hormonal_blood_exam
    where user_id = ?`,
    [userID]
  );

  const [row3] = await sqlPool.query(
    `
    select date,white_bloodcells,neutrophils,lymphocytes,single_cells,eosinophils,basophils,
    red_blood_cells,hemoglobin,hematocrit,avg_red_cells_volume,avg_hemoglobin_content,
    avg_hemoglobin_density,red_cell_distribution_range,platelets,avg_platelets_volume,
    platelets_distribution_range,big_platelets
    FROM general_blood_exam
    WHERE user_id = ?`,
    [userID]
  );

  // @ts-ignore
  if (row.length > 0) {
    // @ts-ignore
    const dataArray = [...row, ...row2, ...row3];
    // @ts-ignore

    dataArray.sort((a, b) => {
      b.date - a.date;
    });

    let modifiedDataArray = dataArray.map((obj) => {
      return {
        ...obj,
        date: new Date(obj.date),
      };
    });
    return modifiedDataArray;
  }
  // @ts-ignore
  return row[0];
}
async function createNewHormonalBloodExam(
  userInfo: IUserInfoRequest,
  examInfo: IHormonalBloodRequest,
  doctor_id: number
) {
  const date = new Date().getTime();
  let user;
  if (userInfo.id) {
    user = await getUserByIdQuery(userInfo.id, "user");
  }
  console.log(doctor_id, user);
  if (!user) {
    user = await createNewUser({ ...userInfo, doctor_id: doctor_id });
  }

  console.log(user);
  console.log(user.insertId);

  const [row] = await sqlPool.query(
    `insert into hormonal_blood_exam (date,user_age,doctor_id,user_id,thyroid_stimulating_hormone,triiodothyronine,free_thyroxine,anti_TPO,anti_TG,parathormone,calcitonin) values (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      date,
      userInfo.age,
      doctor_id,
      user.insertId,
      examInfo.thyroid_stimulating_hormone,
      examInfo.triiodothyronine,
      examInfo.free_thyroxine,
      examInfo.anti_TPO,
      examInfo.anti_TG,
      examInfo.parathormone,
      examInfo.calcitonin,
    ]
  );

  return row;
}

export const getHormonalBloodExamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const [row] = await sqlPool.query(
      `select * from hormonal_blood_exam where user_id = ? order by date desc`,
      [id]
    );
    //@ts-ignore
    if (row.length > 0) {
      //@ts-ignore
      let modifiedDataArray = row.map((obj) => {
        return {
          ...obj,
          date: new Date(obj.date),
        };
      });
      res.json(modifiedDataArray).status(200);
      return;
    }
    res.json(row).status(200);
    return;
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};

export const createGeneralBloodExam = async (req: Request, res: Response) => {
  try {
    if (!!!req.body.examInfo) {
      throw new Error("Missing hormonal exam info");
    }
    await createNewGenerealBloodExam(
      req.body.userInfo,
      req.body.examInfo,
      res.locals.id
    );
    res.json("OK").status(200);
    return;
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};

async function createNewGenerealBloodExam(
  userInfo: IUserInfoRequest,
  examInfo: IGeneralBloodRequest,
  doctor_id: number
) {
  const date = new Date().getTime();
  let user;
  if (userInfo.id) {
    user = await getUserByIdQuery(userInfo.id, "user");
  }
  if (!user) {
    user = await createNewUser({ ...userInfo, doctor_id: doctor_id });
  }
  console.log("user", user);
  const [row] = await sqlPool.query(
    `insert into general_blood_exam (date,user_age,doctor_id,user_id,white_bloodcells,neutrophils,lymphocytes, single_cells,eosinophils,basophils,red_blood_cells,hemoglobin,hematocrit,avg_red_cells_volume,avg_hemoglobin_content,avg_hemoglobin_density,red_cell_distribution_range,platelets,avg_platelets_volume,platelets_distribution_range,big_platelets) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      date,
      userInfo.age,
      doctor_id,
      user.insertId,
      examInfo.white_bloodcells,
      examInfo.neutrophils,
      examInfo.lymphocytes,
      examInfo.single_cells,
      examInfo.eosinophils,
      examInfo.basophils,
      examInfo.red_blood_cells,
      examInfo.hemoglobin,
      examInfo.hematocrit,
      examInfo.avg_red_cells_volume,
      examInfo.avg_hemoglobin_content,
      examInfo.avg_hemoglobin_density,
      examInfo.red_cell_distribution_range,
      examInfo.platelets,
      examInfo.avg_platelets_volume,
      examInfo.platelets_distribution_range,
      examInfo.big_platelets,
    ]
  );
  return row;
}

export const getGeneralBloodExamByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.query;
    const [row] = await sqlPool.query(
      `select * from general_blood_exam where user_id = ? order by date desc`,
      [id]
    );
    //@ts-ignore
    if (row.length > 0) {
      //@ts-ignore
      let modifiedDataArray = row.map((obj) => {
        return {
          ...obj,
          date: new Date(obj.date),
        };
      });

      // @ts-ignore
      const allCriticalValues = checkAllBloodTestResults(row);

      res.json([modifiedDataArray, allCriticalValues]).status(200);
      return;
    }
    res.json(row).status(200);
    return;
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
    return;
  }
};
