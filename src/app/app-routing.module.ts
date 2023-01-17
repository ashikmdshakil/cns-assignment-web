import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ReportComponent } from './components/report/report.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {path: "", redirectTo : "user",  pathMatch: "full"},
  { path: "user", component: UserComponent, children : [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'report', component: ReportComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
