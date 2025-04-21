import csvToJson from "convert-csv-to-json";

interface EmployeeDataDb {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  title: string;
}

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
}

export interface IEmployeeQuery{
  first_name?: string;
  last_name?:string;
  email?: string;
  department?:string;
  title?:string;
}

interface APIError {
  message: string;
}

interface APIResponse {
  status: number;
  data: IEmployee[] | APIError;
}

class EmployeeService {
  public async getEmployees(query?:IEmployeeQuery): Promise<APIResponse> {
    let status: number = 500;
    let data: IEmployee[] | APIError = [];
    let errorMessage: string = "";

    try {
      const apiDirectory = process.cwd();
      const response = csvToJson
        .fieldDelimiter(",")
        .getJsonFromCsv(
          `${apiDirectory}/src/data/employees.csv`,
        ) as EmployeeDataDb[];
      status = 200;
      data = response.map((employee) => {
        const { id, first_name, last_name, email, department, title } =
          employee;
        return {
          id,
          firstName: first_name,
          lastName: last_name,
          email,
          department,
          title,
        };
      }).filter((employee)=>{

        const departmentQueried=query?.department?.toLowerCase() ?? ""
        const titleQueried=query?.title?.toLowerCase() ?? ""
        const firstNameQueried=query?.first_name?.toLowerCase() ?? ""
       const lastNameQueried=query?.last_name?.toLowerCase() ?? ""
       const emailQueried=query?.email?.toLowerCase() ?? ""
        return employee.department.toLowerCase().includes(departmentQueried) && 
        employee.title.toLowerCase().includes(titleQueried) && 
        employee.firstName.toLowerCase().includes(firstNameQueried) && 
        employee.lastName.toLowerCase().includes(lastNameQueried) && 
        employee.email.toLowerCase().includes(emailQueried)
      })
    } catch (err: any) {
      console.log(err);
      status = 500;

      (errorMessage =
        "An unxpected error occured when retrieving employee data"),
        (data = { message: errorMessage } as APIError);
    }
    return { status, data };
  }
}

export default EmployeeService;
