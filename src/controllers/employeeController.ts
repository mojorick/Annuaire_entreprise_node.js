import { Controller } from "../decorators/controller";
import { Get } from "../decorators/route";
import { EmployeeRepository } from "../models/repositories/employeeRepository";
import { Employee } from "../models/types/employee";
import { Repository } from "../models/repositories/repository";
import { Response, Request } from "express";

@Controller()
class EmployeeController {
  private employeeRepository: Repository<Employee>;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const employees = await this.employeeRepository.getAll();
    res.json(employees);
  }
}
