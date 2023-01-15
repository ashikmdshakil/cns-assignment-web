import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: "", redirectTo: "user", pathMatch: "full" },
  { path: "user", component: UserComponent, children : [
    { path: '', component: NavComponent, outlet: "nav"},
    { path: '', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    //{ path: '', component: LoginComponent, outlet: "body"}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
