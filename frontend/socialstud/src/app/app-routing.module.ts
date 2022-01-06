import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestsComponent } from './components/interests/interests.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path:'login-register',
    component: LoginRegisterComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path:'interests',
    component: InterestsComponent
  },
  { path: '**', redirectTo: 'login-register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
