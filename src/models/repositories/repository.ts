import { type Entity } from "../types/entity";

interface Repository<T extends Entity>{
    getAll(): Promise<Array<T>>;
    insert(entity:T):Promise<void>;
}




export type {Repository};