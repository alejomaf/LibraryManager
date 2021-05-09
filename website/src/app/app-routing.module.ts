import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from "./guards/login.guard"

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }