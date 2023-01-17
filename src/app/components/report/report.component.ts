import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Project } from 'src/app/models/Project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  projectService: ProjectService;
  projects: Project[] = [];
  selectedProject: Project = new Project();
  startTime: Date = new Date();
  endTime: Date = new Date();
  status: number = 0;
  totalUsers: number = 0;
  totalProjects: number = 0;
  totalRunnings: number = 0;
  router: Router;

  constructor(projectService: ProjectService, router: Router){
    this.projectService = projectService;
    this.router = router;
  }

  ngOnInit(): void {
    if(localStorage.getItem('isLogin') == null || localStorage.getItem('isLogin') == '0'){
      this.router.navigateByUrl("/user/login");
    }
    else{
      this.projectService.getAllProjects().subscribe(result =>{
        this.projects = result;
      })
      this.projectService.getProjectOverview().subscribe(result =>{
        this.totalUsers = result.users;
        this.totalProjects = result.projects;
        this.totalRunnings = result.runnings;
      })
    }
  }

  showDetails(id: number){
    this.projects.forEach(element => {
      if(element.id == id){
        this.selectedProject = element;
      }
    });
  }

  search(){
    this.projectService.getAllProjectsByDate(this.startTime, this.endTime, this.status).subscribe(result =>{
      this.projects = result;
    })
  }

  setStatus(number: number){
    this.status = number;
  }


}
