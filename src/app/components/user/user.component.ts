import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  router: Router;

  constructor(router: Router){
    this.router = router;
  }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null && localStorage.getItem("token") == null){
      this.router.navigateByUrl("/user/login");
    }
    else{
      this.router.navigateByUrl("/user/dashboard");
    }
  }

}
