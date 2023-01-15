import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  router: Router;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(router: Router){
    this.router = router;
  }


   login(){
     this.router.navigateByUrl("/user/login");
   }

   signup(){
    this.router.navigateByUrl("/user/signup)");
  }

}
