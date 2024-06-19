export interface IGeneralBloodRequest {
  doctor_id: number;
  user_id: number;
  white_bloodcells: number;
  neutrophils: number;
  lymphocytes: number;
  single_cells: number;
  eosinophils: number;
  basophils: number;
  red_blood_cells: number;
  hemoglobin: number;
  hematocrit: number;
  avg_red_cells_volume: number;
  avg_hemoglobin_content: number;
  avg_hemoglobin_density: number;
  red_cell_distribution_range: number;
  platelets: number;
  avg_platelets_volume: number;
  platelets_distribution_range: number;
  big_platelets: number;
}

// Define the interface for the SubstanceCriticalValue
export interface SubstanceCriticalValueForGeneralBloodExam {
  substance_name: string;
  date_of_test: Date;
  normal_min: number;
  normal_max: number;
  criticalValue: number;
  min_value_for_message?: number;
  max_value_for_message?: number;
  message?: string;
  unit: string;
}

// Define the object structure with the given interface
export interface IGeneralBloodTestResults {
  user_age: number;
  date: Date;
  white_bloodcells: number;
  neutrophils: number;
  lymphocytes: number;
  single_cells: number;
  eosinophils: number;
  basophils: number;
  red_blood_cells: number;
  hemoglobin: number;
  hematocrit: number;
  avg_red_cells_volume: number;
  avg_hemoglobin_content: number;
  avg_hemoglobin_density: number;
  red_cell_distribution_range: number;
  platelets: number;
  avg_platelets_volume: number;
  platelets_distribution_range: number;
  big_platelets: number;
}

export type GeneralBloodTestKeys = keyof Omit<
  IGeneralBloodTestResults,
  "user_age" | "date"
>;

export function checkCriticalValuesForGeneralBloodExams(
  testResults: IGeneralBloodTestResults
): SubstanceCriticalValueForGeneralBloodExam[] {
  const general_blood_exam_ranges: Record<
    GeneralBloodTestKeys,
    { min: number; max: number; unit: string }
  > = {
    white_bloodcells: { min: 4.4, max: 11.3, unit: "K/μl" },
    neutrophils: { min: 40, max: 75, unit: "%" },
    lymphocytes: { min: 20, max: 40, unit: "%" },
    single_cells: { min: 2, max: 10, unit: "%" },
    eosinophils: { min: 0.5, max: 6, unit: "%" },
    basophils: { min: 0, max: 1, unit: "%" },
    red_blood_cells: { min: 4.5, max: 5.5, unit: "M/μl" },
    hemoglobin: { min: 13, max: 18, unit: "g/dL" },
    hematocrit: { min: 42, max: 54, unit: "%" },
    avg_red_cells_volume: { min: 79, max: 96, unit: "fl" },
    avg_hemoglobin_content: { min: 27, max: 33, unit: "pgr" },
    avg_hemoglobin_density: { min: 30, max: 36, unit: "g/dl" },
    red_cell_distribution_range: { min: 11, max: 16, unit: "%" },
    platelets: { min: 150, max: 400, unit: "K/μl" },
    avg_platelets_volume: { min: 6, max: 11, unit: "fl" },
    platelets_distribution_range: { min: 9, max: 17, unit: "fl" },
    big_platelets: { min: 13, max: 43, unit: "%" },
  };
  const criticalValues: SubstanceCriticalValueForGeneralBloodExam[] = [];

  for (const [key, value] of Object.entries(testResults)) {
    if (key in general_blood_exam_ranges) {
      // @ts-ignore
      const { min, max, unit } = general_blood_exam_ranges[key];
      if (value < min || value > max) {
        criticalValues.push({
          substance_name: key,
          date_of_test: testResults.date,
          normal_min: min,
          normal_max: max,
          criticalValue: value,
          unit,
          message: "",
          min_value_for_message: -1,
          max_value_for_message: -1,
        });
      }
    }
  }

  return criticalValues;
}

export function checkAllGeneralBloodTestResults(
  testResultsArray: IGeneralBloodTestResults[]
): SubstanceCriticalValueForGeneralBloodExam[][] {
  return testResultsArray.map(checkCriticalValuesForGeneralBloodExams);
}
