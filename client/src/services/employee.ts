import axios from "axios";

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
}

export interface ServiceResponse<T> {
  isSuccessful: boolean;
  data: T | { message: string };
}
const getEmployees = async (): Promise<ServiceResponse<IEmployee[]>> => {
  let isSuccessful = false;
  let data: IEmployee[] = [];
  let message: string = "";

  try {
    const response = await axios.get<IEmployee[]>(
      "http://localhost:9000/employee",
    );
    isSuccessful = true;
    data = response.data;
  } catch (err: any) {
    message =
      err?.response?.data?.message ??
      "Unexpected error occurred while retrievng employees";
  }
  return { isSuccessful, data: isSuccessful ? data : { message } };
};

export { getEmployees };
