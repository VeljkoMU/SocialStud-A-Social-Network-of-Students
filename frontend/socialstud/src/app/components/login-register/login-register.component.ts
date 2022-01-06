import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  public username: string ="";
  public password: string = "";
  public name: string = "";
  public surname: string = "";
  public location: string = "";
  public faculty: string = "";
  public bday: string = "";
  public year: string = "";
  public usernamereg: string = "";
  public passwordreg: string = "";
  public email:string ="";

  constructor(private loginregservice: LoginRegisterService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.loginregservice.login(this.username, this.password);
  }

  public register(){
    this.loginregservice.register(this.usernamereg, this.passwordreg, this.name, this.surname, this.location,this.faculty,this.bday, this.year, this.email);
  }

  public saveUserDataToSharedService(username: string, password:string){

  }

  public test(){
    this.router.navigateByUrl("http://localhost:4200/main");
  }
}
