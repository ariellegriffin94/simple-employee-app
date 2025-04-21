import { stat } from "fs";
import { EmployeeService } from "../services";
import { Request, Response } from "express";

class EmployeeController {
  private employeeService: InstanceType<typeof EmployeeService>;

  constructor() {
    this.employeeService = new EmployeeService();
    this.getEmployees = this.getEmployees.bind(this);
  }

  public async getEmployees(_req: Request, res: Response): Promise<void> {
    const getEmployeesRes = await this.employeeService.getEmployees();
    const { status, data } = getEmployeesRes;
    res.status(status).json(data);
  }
}

export default EmployeeController;
