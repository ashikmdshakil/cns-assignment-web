import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project.model';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  project: Project = new Project();
  projectService: ProjectService;
  router: Router;



  constructor(projectService: ProjectService, router: Router, userService: UserService){
    this.projectService = projectService;
    this.router = router;
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(result =>{
      console.log(result);
    })
  }


  createProject(){
    this.projectService.createProject(this.project).subscribe(result =>{
      console.log(result);
      if(result == 'success'){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
  }
}
