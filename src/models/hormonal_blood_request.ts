export interface IHormonalBloodRequest {
  doctor_id: number;
  user_id: number;
  thyroid_stimulating_hormone: number;
  triiodothyronine: number;
  free_thyroxine: number;
  anti_TPO: number;
  anti_TG: number;
  parathormone: number;
  calcitonin: number;
}

export interface SubstanceCriticalValueForHormonalBloodExam {
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

export interface HormonalBloodExamResults {
  user_age: number;
  date: Date;
  thyroid_stimulating_hormone: number;
  triiodothyronine: number;
  free_thyroxine: number;
  anti_TPO: number;
  anti_TG: number;
  parathormone: number;
  calcitonin: number;
}

export function getRangeForAge(ranges: any[], age: number) {
  return ranges.find((range) => age >= range.age_min && age <= range.age_max);
}

export function checkCriticalValuesForHormonalBloodExam(
  testResult: HormonalBloodExamResults
): SubstanceCriticalValueForHormonalBloodExam[] {
  const criticalValues: SubstanceCriticalValueForHormonalBloodExam[] = [];

  const ranges = {
    thyroid_stimulating_hormone: [
      { min: 0.7, max: 15.2, age_min: 0, age_max: 6 / 365, unit: "μIU/ml" },
      {
        min: 0.72,
        max: 11,
        age_min: 6 / 365,
        age_max: 90 / 365,
        unit: "μIU/ml",
      },
      { min: 0.73, max: 8.35, age_min: 90 / 365, age_max: 1, unit: "μIU/ml" },
      { min: 0.7, max: 5.97, age_min: 1, age_max: 6, unit: "μIU/ml" },
      { min: 0.6, max: 4.84, age_min: 6, age_max: 11, unit: "μIU/ml" },
      { min: 0.51, max: 4.3, age_min: 11, age_max: 18, unit: "μIU/ml" },
      { min: 0.27, max: 4.2, age_min: 18, age_max: Infinity, unit: "μIU/ml" },
    ],
    triiodothyronine: [
      { min: 1.12, max: 4.43, age_min: 0, age_max: 6 / 365, unit: "nmol/l" },
      {
        min: 1.23,
        max: 4.22,
        age_min: 6 / 365,
        age_max: 90 / 365,
        unit: "nmol/l",
      },
      { min: 1.32, max: 4.07, age_min: 90 / 365, age_max: 1, unit: "nmol/l" },
      { min: 1.42, max: 3.8, age_min: 1, age_max: 6, unit: "nmol/l" },
      { min: 1.43, max: 3.55, age_min: 6, age_max: 11, unit: "nmol/l" },
      { min: 1.4, max: 3.34, age_min: 11, age_max: 18, unit: "nmol/l" },
      { min: 1.27, max: 3.1, age_min: 18, age_max: Infinity, unit: "nmol/l" },
    ],
    free_thyroxine: [
      { min: 11.0, max: 32.0, age_min: 0, age_max: 6 / 365, unit: "pmol/l" },
      {
        min: 11.5,
        max: 28.3,
        age_min: 6 / 365,
        age_max: 90 / 365,
        unit: "pmol/l",
      },
      { min: 11.9, max: 25.6, age_min: 90 / 365, age_max: 1, unit: "pmol/l" },
      { min: 12.3, max: 22.8, age_min: 1, age_max: 6, unit: "pmol/l" },
      { min: 12.5, max: 21.5, age_min: 6, age_max: 11, unit: "pmol/l" },
      { min: 12.6, max: 21.0, age_min: 11, age_max: 18, unit: "pmol/l" },
      {
        min: 12.0,
        max: 22.0,
        age_min: 18,
        age_max: Infinity,
        unit: "pmol/l",
        actual_min: 30,
        actual_max: 8,
        messages: { low: "Hypothyroidism", high: "Hyperthyroidism" },
      },
    ],
    anti_TPO: [
      { min: 0, max: 117, age_min: 0, age_max: 6 / 365, unit: "IU/ml" },
      { min: 0, max: 47, age_min: 6 / 365, age_max: 90 / 365, unit: "IU/ml" },
      { min: 0, max: 32, age_min: 90 / 365, age_max: 1, unit: "IU/ml" },
      { min: 0, max: 13, age_min: 1, age_max: 6, unit: "IU/ml" },
      { min: 0, max: 18, age_min: 6, age_max: 11, unit: "IU/ml" },
      { min: 0, max: 26, age_min: 11, age_max: 18, unit: "IU/ml" },
      { min: 0, max: 34, age_min: 18, age_max: Infinity, unit: "IU/ml" },
    ],
    anti_TG: [
      { min: 0, max: 134, age_min: 0, age_max: 6 / 365, unit: "IU/ml" },
      { min: 0, max: 146, age_min: 6 / 365, age_max: 90 / 365, unit: "IU/ml" },
      { min: 0, max: 130, age_min: 90 / 365, age_max: 1, unit: "IU/ml" },
      { min: 0, max: 38, age_min: 1, age_max: 6, unit: "IU/ml" },
      { min: 0, max: 37, age_min: 6, age_max: 11, unit: "IU/ml" },
      { min: 0, max: 64, age_min: 11, age_max: 18, unit: "IU/ml" },
      { min: 0, max: 115, age_min: 18, age_max: Infinity, unit: "IU/ml" },
    ],
    parathormone: [
      { min: 15, max: 65, age_min: 0, age_max: Infinity, unit: "pg/ml" },
    ],
    calcitonin: [
      { min: 0, max: 14.3, age_min: 0, age_max: Infinity, unit: "pg/ml" },
    ],
  };

  for (const [key, value] of Object.entries(testResult)) {
    //@ts-ignore
    if (key !== "user_age" && key !== "date" && ranges[key]) {
      const age = testResult.user_age;
      //@ts-ignore
      const range = getRangeForAge(ranges[key], age);
      if (range) {
        const { min, max, unit, actual_min, actual_max, messages } = range;
        let message = "";
        let actualMin = actual_min;
        let actualMax = actual_max;

        if (value < min || value > max) {
          if (value < min && value < actualMax) {
            message = messages?.low || "";
          } else if (value > max && value > actualMin) {
            message = messages?.high || "";
          }

          const criticalValueEntry: SubstanceCriticalValueForHormonalBloodExam =
            {
              substance_name: key,
              date_of_test: testResult.date,
              normal_min: min,
              normal_max: max,
              criticalValue: value,
              unit: unit,
            };
          criticalValueEntry.message = message;

          if (value < actual_max) {
            criticalValueEntry.min_value_for_message = -1;
            criticalValueEntry.max_value_for_message = actualMax;
          } else if (value > actual_min) {
            criticalValueEntry.min_value_for_message = actualMin;
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

export function checkAllHormonalBloodTestResults(
  testResultsArray: HormonalBloodExamResults[]
): SubstanceCriticalValueForHormonalBloodExam[][] {
  return testResultsArray.map((testResult) =>
    checkCriticalValuesForHormonalBloodExam(testResult)
  );
}
