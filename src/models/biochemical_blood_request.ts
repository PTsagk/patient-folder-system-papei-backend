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
  normal_min: number;
  normal_max: number;
  criticalValue: number;
  min_value_for_message?: number;
  max_value_for_message?: number;
  unit: string;
  message?: string;
}

export interface biochemicalBloodExamResults {
  user_age: number;
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
