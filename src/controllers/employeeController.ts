import { Controller } from "../decorators/controller";
import { Get ,Post,Patch} from "../decorators/route";
import { Employee } from "../models/types/employee";
import { Repository } from "../models/repositories/repository";
import { Response, Request } from "express";
import {Keys} from "../keys";
import { Inject } from "../decorators/inject";
import { EmployeeRepository } from "../models/repositories/employeeRepository";
import { TeamRepository } from "../models/repositories/teamRepository";


@Controller()
class EmployeeController {
  private readonly employeeRepository: EmployeeRepository;
  private readonly teamRepository: TeamRepository;

  constructor(
    @Inject(Keys.EmployeeRepository) 
      employeeRepository:EmployeeRepository,
    @Inject(Keys.teamRepository)
      teamRepository:TeamRepository
  ) {
    this.employeeRepository = employeeRepository;
    this.teamRepository = teamRepository;
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const employees = await this.employeeRepository.getAll();
    res.json(employees);
  }

  @Post()
  async post(request:Request,response:Response){
    if(this.isEmployee(request.body)){
      if(this.isValid(request.body)){
        const exists = await this.employeeRepository.exists(
          request.body.email
        );
        
        if(!exists){
          await this.employeeRepository.insert(request.body);
          response.sendStatus(200);
        }else{
          response.status (400).json({
            message: "Email already exists"
          });
        }
      }else{
        response.status(400).json({
          message:"Employee data validation failed"
        });
      }
    }else{
      response.status(400).json({
        message:"Request body is not an employee"
      });
    }
  }

  @Patch(":employeeId/team/:teamId")
  async changeTeam(request:Request,response:Response){
    const employeeId = request.params.employeeId;
    const teamId = request.params.teamId;

    if (
      typeof employeeId === "string" &&
      typeof teamId === "string" &&
      this.isIdentifier(employeeId) &&
      this.isIdentifier(teamId)
    ) {
      const exists = await this.teamRepository.exists(
        parseInt(teamId)
      );

      if(exists){
        await this.employeeRepository.changeTeam(
          parseInt(employeeId),
          parseInt(teamId)
        );
        response.sendStatus(200);
      }else{
        response.status(400).json({
          message: "Team does not exists"
        });
      }
    } else {
      response.status(400).json({
        message: "Invalid identifier"
      });
    }
  }

  private isEmployee(value:any): value is Employee{
    return (
      value.firstName && 
      value.lastName &&
      value.email
    );
  }

  private isValid(employee:Employee){
    return (
      employee.firstName.length &&
      employee.lastName.length &&
      /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/
      .test(employee.email)
    );
  }

  private isIdentifier(value:string){
    return /^\d+$/.test(value);
  }
}
