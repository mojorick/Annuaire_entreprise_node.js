import { AbstractRepository } from "./abstractRepository";
import { Employee } from "../types/employee";
import { QueryType } from "./queryType";

class EmployeeRepository extends AbstractRepository<Employee> {
    getParams(entity: Employee): any[] {
        
        return [
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.teamId || undefined
        ];
    }
    
    constructor() {
        super();
        this.addQuery(QueryType.GetAll,
            `SELECT
                e.Id as id,
                e.FirstName as firstName,
                e.LastName as lastName,
                e.Email as email,
                t.Id as teamId
            FROM Employee as e
            LEFT OUTER JOIN Team as t on e.TeamId = t.Id`
        );
    }

    
}

export {EmployeeRepository};
