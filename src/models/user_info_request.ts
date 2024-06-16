export interface IUserInfoRequest {
  id?: number;
  doctor_id: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  telephone: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  amka: string;
  country: string;
  region: string;
  city: string;
  street: string;
  address_num: number;
  role: string;
}
