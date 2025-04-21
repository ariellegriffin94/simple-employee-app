import { stat } from "fs";
import { EmployeeService } from "../services";
import { Request, Response } from "express";
import { IEmployeeQuery } from "../services/employee";

class EmployeeController {
  private employeeService: InstanceType<typeof EmployeeService>;

  constructor() {
    this.employeeService = new EmployeeService();
    this.getEmployees = this.getEmployees.bind(this);
  }

  public async getEmployees(req: Request, res: Response): Promise<void> {
    const query = req.query as unknown as IEmployeeQuery;
    const getEmployeesRes = await this.employeeService.getEmployees(query);
    const { status, data } = getEmployeesRes;
    res.status(status).json(data);
  }

}

export default EmployeeController;
