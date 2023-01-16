import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  userService: UserService;
  user: User = new User();
  router: Router;

  constructor(userService: UserService, router: Router){
    this.userService = userService;
    this.router = router;
  }

  saveUser(){
    if(this.user.name == '' && this.user.password == ''){
      Swal.fire({
        icon: 'info',
        title: 'User info required.',
        text: 'Please fill name and password properly.',
      })
    }
    else{
      this.userService.registerUser(this.user).subscribe(result =>{
        if(result == 'success'){
          Swal.fire({
            title: 'Success!',
            text: 'You are successfully registered.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.router.navigate(['/user/login']);
        }
        else if(result == "exist"){
          Swal.fire({
            icon: 'info',
            title: 'Already Exist',
            text: 'User with this name already exists.',
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



}
