import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  constructor(projectService: ProjectService){
    this.projectService = projectService;
  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(result =>{
      this.projects = result;
    })    
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


}
