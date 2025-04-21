import { Request, Router } from "express";
import { EmployeeController } from "../controllers";

const router = Router();

const employeeController = new EmployeeController();

router.get("/", employeeController.getEmployees);

export default router;
