import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/models/Credential.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  userService: UserService;
  router: Router;
  credential: Credential = new Credential();
  user: User = new User();

  constructor(userService: UserService, router: Router){
    this.userService = userService;
    this.router = router;
  }

  ngOnInit(): void {
  
  }

  login(){
    if(this.credential.name == "" && this.credential.password == ""){
      Swal.fire({
        icon: 'info',
        title: 'User info required.',
        text: 'Please fill name and password properly.',
      })
    }
    else{
      this.userService.authenticateUser(this.credential).subscribe(result =>{
        this.user = result;
        localStorage.setItem('token',this.user.JWTToken);
        localStorage.setItem('user', JSON.stringify(this.user));
    })
    }
  }

}
