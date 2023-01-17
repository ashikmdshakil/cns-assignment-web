import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isLogin: boolean = false;
  router: Router;
  name: string = '';
  user: User = new User();

  ngOnInit(): void {
    setInterval(()=>{
      if(localStorage.getItem('user') == null || localStorage.getItem('token') == null || localStorage.getItem('isLogin') == '0'){
        this.isLogin = false;
      }
      else if( localStorage.getItem('isLogin') == '1'){
        this.isLogin = true;
      }
    },1000)
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
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

  logout(){
    window.localStorage.clear();
    localStorage.setItem('isLogin','0');
    this.isLogin = false;
    this.router.navigateByUrl("/user/login");
  }

}
