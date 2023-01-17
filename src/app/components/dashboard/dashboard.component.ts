import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project.model';
import { User } from 'src/app/models/user.model';
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
  userService: UserService;
  router: Router;
  projects: Project[] = [];
  users: User[] = [];
  selectedProject: Project = new Project();
  isOwner: boolean = true;



  constructor(projectService: ProjectService, router: Router, userService: UserService){
    this.projectService = projectService;
    this.router = router;
    this.userService = userService;
  }

  ngOnInit(): void {
    if(localStorage.getItem('isLogin') == null || localStorage.getItem('isLogin') == '0'){
      this.router.navigateByUrl("/user/login");
    }
    else{
      this.projectService.getProjects().subscribe(result =>{
        this.projects = result;
      })
      this.userService.allUsers().subscribe(result =>{
        this.users = result;
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

  updateProject(){
    this.projectService.updateProject(this.selectedProject).subscribe(result =>{
      if(result == "success"){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.projectService.getProjects().subscribe(result =>{
          this.projects = result;
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

  changeStatus(id: number){
    this.selectedProject.status = id;
  }

  addEmployee(name: string){
    this.projectService.addEmployeeToProject(this.selectedProject.id, name).subscribe(result =>{
      if(result == "success"){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.projectService.getProjects().subscribe(result =>{
          this.projects = result;
        })
      }
      else if(result == "over"){
        Swal.fire({
          title: 'Sorry',
          text: 'More than 5 can not be added.',
          icon: 'info',
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


  removeEmployee(name: string){
    this.projectService.removeEmployeeToProject(this.selectedProject.id, name).subscribe(result =>{
      if(result == "success"){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.projectService.getProjects().subscribe(result =>{
          this.projects = result;
        })
      }
      else if(result == "over"){
        Swal.fire({
          title: 'Sorry',
          text: 'More than 5 can not be added.',
          icon: 'info',
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


  createProject(){
    this.projectService.createProject(this.project).subscribe(result =>{
      if(result == 'success'){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.projectService.getProjects().subscribe(result =>{
          this.projects = result;
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

  removeProject(id: number){
    this.projectService.removeProject(id).subscribe(result =>{
      if(result == 'success'){
        Swal.fire({
          title: 'Success!',
          text: 'You are successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.projectService.getProjects().subscribe(result =>{
          this.projects = result;
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

  ownerList(){
    this.projectService.getProjects().subscribe(result =>{
      this.projects = result;
      this.isOwner = true;
    })
  }

  memberList(){
    this.projectService.getProjectsAsEmployee().subscribe(result =>{
      this.projects = result;
      this.isOwner = false;
    })
  }

  
}
