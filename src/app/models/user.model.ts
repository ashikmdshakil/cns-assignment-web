import { Role } from "./Role.model";

export class User{
    id: number = 0;
    name: string = "";
    mobileNumber: string ="";
    email: string = "";
    password: string = "";
    projects: [] = [];
    role: Role = new Role();
    JWTToken: string = "";
}