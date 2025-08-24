import { Controller } from "../decorators/controller";
import { Get } from "../decorators/route";
import { Employee } from "../models/types/employee";
import { Repository } from "../models/repositories/repository";
import { Response, Request } from "express";
import {Keys} from "../keys";
import { Inject } from "../decorators/inject";

@Controller()
class EmployeeController {
  private employeeRepository: Repository<Employee>;

  constructor(
    @Inject(Keys.EmployeeRepository) 
    employeeRepository:Repository<Employee>
  ) {
    this.employeeRepository = employeeRepository;
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const employees = await this.employeeRepository.getAll();
    res.json(employees);
  }
}
