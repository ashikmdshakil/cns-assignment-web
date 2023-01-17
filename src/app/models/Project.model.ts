import { User } from "./user.model";

export class Project{
    id: number = 0;
    name: string = "";
    intro: string = "";
    status: number = 0;
    startDateTime: Date = new Date();
    endDateTime: Date = new Date();
    owner: User = new User();
    projectMembers: User[] = [];
}