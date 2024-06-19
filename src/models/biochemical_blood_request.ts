import { getRangeForAge } from "./hormonal_blood_request";
export interface IBiochemicalBloodRequest {
  doctor_id: number;
  user_id: number;
  blood_sugar: number;
  urea: number;
  creatinine: number;
  SGOT: number;
  SGPT: number;
  gamma_GT: number;
  cholesterol: number;
  triglycerides: number;
  cholesterol_HDL: number;
  cholesterol_LDL: number;
  albumin: number;
  total_bilirubin: number;
  direct_bilirubin: number;
  LDH: number;
  alkaline_phosphatase: number;
  potassium: number;
  sodium: number;
  total_calcium: number;
  iron: number;
  vitamin_B12: number;
  folic_acid: number;
  CRP_quantitative: number;
  ferritin: number;
  hydroxyvitamin_25_D: number;
}

export interface SubstanceCriticalValueForBiochemicalBloodExam {
  substance_name: string;
  date_of_test: Date;
  normal_min: number;
  normal_max: number;
  criticalValue: number;
  min_value_for_message?: number;
  max_value_for_message?: number;
  unit: string;
  message?: string;
}

export interface BiochemicalBloodExamResults {
  user_age: number;
  date: Date;
  blood_sugar: number;
  urea: number;
  creatinine: number;
  SGOT: number;
  SGPT: number;
  gamma_GT: number;
  cholesterol: number;
  triglycerides: number;
  cholesterol_HDL: number;
  cholesterol_LDL: number;
  albumin: number;
  total_bilirubin: number;
  direct_bilirubin: number;
  LDH: number;
  alkaline_phosphatase: number;
  potassium: number;
  sodium: number;
  total_calcium: number;
  iron: number;
  vitamin_B12: number;
  folic_acid: number;
  CRP_quantitative: number;
  ferritin: number;
  hydroxyvitamin_25_D: number;
}

export function checkCriticalValuesForBiochemicalBloodExam(
  testResult: BiochemicalBloodExamResults
): SubstanceCriticalValueForBiochemicalBloodExam[] {
  const criticalValues: SubstanceCriticalValueForBiochemicalBloodExam[] = [];

  const ranges = {
    blood_sugar: [
      {
        min: 65,
        max: 100,
        age_min: 0,
        age_max: Infinity,
        unit: "mg/dl",
        actual_min2: 100,
        actual_max2: 125,
        messages: { low: "prediabetes", high: "diabetes" },
      },
    ],
    urea: [{ min: 10, max: 50, age_min: 0, age_max: Infinity, unit: "mg/dl" }],
    creatinine: [
      { min: 0.24, max: 0.79, age_min: 0, age_max: 13, unit: "mg/dl" },
      { min: 0.7, max: 1.3, age_min: 13, age_max: Infinity, unit: "mg/dl" },
    ],
    SGOT: [
      { min: 5, max: 48, age_min: 0, age_max: 13, unit: "U/L" },
      { min: 5, max: 40, age_min: 13, age_max: Infinity, unit: "U/L" },
    ],
    SGPT: [
      { min: 5, max: 50, age_min: 0, age_max: 13, unit: "U/L" },
      { min: 5, max: 40, age_min: 13, age_max: Infinity, unit: "U/L" },
    ],
    gamma_GT: [{ min: 8, max: 61, age_min: 0, age_max: Infinity, unit: "U/L" }],
    cholesterol: [
      { min: 0, max: 170, age_min: 0, age_max: Infinity, unit: "mg/dl" },
    ],
    triglycerides: [
      { min: 0, max: 75, age_min: 0, age_max: 9, unit: "mg/dl" },
      { min: 0, max: 90, age_min: 9, age_max: 18, unit: "mg/dl" },
      { min: 0, max: 150, age_min: 18, age_max: Infinity, unit: "mg/dl" },
    ],
    cholesterol_HDL: [
      { min: 45, max: 110, age_min: 0, age_max: 18, unit: "mg/dl" },
      { min: 40, max: 100, age_min: 18, age_max: Infinity, unit: "mg/dl" },
    ],
    cholesterol_LDL: [
      { min: 0, max: 110, age_min: 0, age_max: 18, unit: "mg/dl" },
      { min: 0, max: 100, age_min: 18, age_max: Infinity, unit: "mg/dl" },
    ],
    albumin: [
      { min: 2.4, max: 2.8, age_min: 0, age_max: 4 / 365, unit: "gr/dl" },
      { min: 3.8, max: 5.4, age_min: 4 / 365, age_max: 14, unit: "gr/dl" },
      { min: 3.2, max: 4.5, age_min: 14, age_max: 18, unit: "gr/dl" },
      { min: 3.5, max: 5.2, age_min: 18, age_max: Infinity, unit: "gr/dl" },
    ],
    total_bilirubin: [
      { min: 0.1, max: 5, age_min: 0, age_max: 30 / 365, unit: "mg/dl" },
      { min: 0.1, max: 1, age_min: 30 / 365, age_max: 18, unit: "mg/dl" },
      { min: 0.1, max: 1.2, age_min: 18, age_max: Infinity, unit: "mg/dl" },
    ],
    direct_bilirubin: [
      { min: 0.01, max: 0.3, age_min: 0, age_max: Infinity, unit: "mg/dl" },
    ],
    LDH: [
      { min: 140, max: 370, age_min: 0, age_max: 2, unit: "U/L" },
      { min: 140, max: 300, age_min: 2, age_max: 15, unit: "U/L" },
      { min: 120, max: 225, age_min: 15, age_max: Infinity, unit: "U/L" },
    ],
    alkaline_phosphatase: [
      { min: 39, max: 316, age_min: 0, age_max: 7, unit: "U/L" },
      { min: 39, max: 381, age_min: 7, age_max: 17, unit: "U/L" },
      { min: 39, max: 140, age_min: 17, age_max: Infinity, unit: "U/L" },
    ],
    potassium: [
      { min: 3.7, max: 5.9, age_min: 0, age_max: 30 / 365, unit: "mmol/L" },
      { min: 3.1, max: 5.1, age_min: 30 / 365, age_max: 18, unit: "mmol/L" },
      { min: 3.5, max: 5.1, age_min: 18, age_max: Infinity, unit: "mmol/L" },
    ],
    sodium: [
      { min: 135, max: 145, age_min: 0, age_max: 30 / 365, unit: "mmol/L" },
      { min: 139, max: 146, age_min: 30 / 365, age_max: 1, unit: "mmol/L" },
      { min: 132, max: 145, age_min: 1, age_max: 18, unit: "mmol/L" },
      { min: 135, max: 150, age_min: 18, age_max: Infinity, unit: "mmol/L" },
    ],
    total_calcium: [
      { min: 7.6, max: 10.4, age_min: 0, age_max: 10 / 365, unit: "mg/dl" },
      { min: 9, max: 11, age_min: 10 / 365, age_max: 2, unit: "mg/dl" },
      { min: 8.8, max: 10.8, age_min: 2, age_max: 12, unit: "mg/dl" },
      { min: 8.8, max: 10.8, age_min: 12, age_max: 18, unit: "mg/dl" },
      { min: 8.6, max: 10, age_min: 18, age_max: 60, unit: "mg/dl" },
      { min: 8.8, max: 10.2, age_min: 60, age_max: 90, unit: "mg/dl" },
      { min: 8.2, max: 9.6, age_min: 90, age_max: Infinity, unit: "mg/dl" },
    ],
    iron: [
      { min: 33, max: 193, age_min: 0, age_max: Infinity, unit: "μgr/dl" },
    ],
    vitamin_B12: [
      { min: 160, max: 970, age_min: 0, age_max: Infinity, unit: "μgr/dl" },
    ],
    folic_acid: [
      { min: 33, max: 193, age_min: 0, age_max: Infinity, unit: "μgr/dl" },
    ],
    CRP_quantitative: [
      { min: 0, max: 5, age_min: 0, age_max: Infinity, unit: "pg/ml" },
    ],
    ferritin: [
      { min: 220, max: 380, age_min: 0, age_max: 30 / 365, unit: "ng/ml" },
      {
        min: 30,
        max: 270,
        age_min: 30 / 365,
        age_max: 90 / 365,
        unit: "ng/ml",
      },
      {
        min: 20,
        max: 160,
        age_min: 90 / 365,
        age_max: 180 / 365,
        unit: "ng/ml",
      },
      { min: 10, max: 70, age_min: 180 / 365, age_max: 1, unit: "ng/ml" },
      { min: 5, max: 140, age_min: 1, age_max: 18, unit: "ng/ml" },
      { min: 20, max: 400, age_min: 18, age_max: Infinity, unit: "ng/ml" },
    ],
    hydroxyvitamin_25_D: [
      {
        min: 30,
        max: 100,
        age_min: 0,
        age_max: Infinity,
        actual_min3: 10,
        actual_max3: 20,
        actual_max4: 100,
        unit: "pmol/l",
        messages: {
          severe: "Severe_insufficiency",
          moderate: "insufficiency",
          mild: "Mild_insufficiency",
          extreme: "Toxicity_Levels",
        },
      },
    ],
  };

  for (const [key, value] of Object.entries(testResult)) {
    //@ts-ignore
    if (key !== "user_age" && key !== "date" && ranges[key]) {
      const age = testResult.user_age;
      //@ts-ignore
      const range = getRangeForAge(ranges["blood_sugar"], age);
      if (range) {
        const {
          min,
          max,
          unit,
          actual_min2,
          actual_min3,
          actual_max2,
          actual_max3,
          actual_max4,
          messages,
        } = range;

        let message = "";
        let actualMin2 = actual_min2;
        let actualMax2 = actual_max2;
        let actualMin3 = actual_min3;
        let actualMax3 = actual_max3;
        let actualMax4 = actual_max4;

        if (value < min || value > max) {
          if (
            actualMin2 !== undefined &&
            value > actualMin2 &&
            value <= actualMax2
          ) {
            message = messages?.low || "";
          } else if (actualMax2 !== undefined && value > actualMax2) {
            message = messages?.high || "";
          }

          if (actualMax3 !== undefined && value < min && value >= actualMax3) {
            message = messages?.mild || "";
          } else if (actualMin3 !== undefined && value < actualMin3) {
            message = messages?.severe || "";
          } else if (
            actualMin3 !== undefined &&
            value >= actualMin3 &&
            value < actualMax3
          ) {
            message = messages?.moderate || "";
          } else if (actualMax4 !== undefined && value > actualMax4) {
            message = messages?.extreme || "";
          }
          console.log(message);
          const criticalValueEntry: SubstanceCriticalValueForBiochemicalBloodExam =
            {
              substance_name: key,
              date_of_test: testResult.date,
              normal_min: min,
              normal_max: max,
              criticalValue: value,
              unit: unit,
              message: message,
            };

          if (value > actualMin2 && value < actualMax2) {
            criticalValueEntry.min_value_for_message = actualMin2;
            criticalValueEntry.max_value_for_message = actualMax2;
          } else if (value > actualMax2) {
            criticalValueEntry.min_value_for_message = actualMax2;
            criticalValueEntry.max_value_for_message = -1;
          } else if (value > actualMin3 && value < actualMax3) {
            criticalValueEntry.min_value_for_message = actualMin3;
            criticalValueEntry.max_value_for_message = actualMax3;
          } else if (value < actualMin3) {
            criticalValueEntry.min_value_for_message = -1;
            criticalValueEntry.max_value_for_message = actualMin3;
          } else if (value > actualMax3 && value < min) {
            criticalValueEntry.min_value_for_message = actualMax3;
            criticalValueEntry.max_value_for_message = min;
          } else if (value > actualMax4) {
            criticalValueEntry.min_value_for_message = actualMax4;
            criticalValueEntry.max_value_for_message = -1;
          } else {
            criticalValueEntry.min_value_for_message = -1;
            criticalValueEntry.max_value_for_message = -1;
          }

          criticalValues.push(criticalValueEntry);
        }
      }
    }
  }

  return criticalValues;
}
export function checkAllBiochemicalBloodTestResults(
  testResultsArray: BiochemicalBloodExamResults[]
): SubstanceCriticalValueForBiochemicalBloodExam[][] {
  return testResultsArray.map((testResult) =>
    checkCriticalValuesForBiochemicalBloodExam(testResult)
  );
}
