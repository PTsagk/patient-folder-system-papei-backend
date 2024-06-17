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
