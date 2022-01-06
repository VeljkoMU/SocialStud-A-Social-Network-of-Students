import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataSharedStateService } from './user-data-shared-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private httpClient: HttpClient,
    private userData: UserDataSharedStateService,
    private router: Router) { }

  public register(username:string, password:string, name:string, surname:string, location:string, faculty:string, birthdate:string, year:string, email:string){
    this.httpClient.post("http://127.0.0.1:5000/login/register", {
      username: username,
      password: password,
      name: name,
      surname: surname,
      location: location,
      faculty: faculty,
      birthdate: birthdate,
      year: year,
      email: email
    }, {observe: 'response'}).subscribe((res)=>{
      if(res.status==200){
        alert("Registartion successful!");
        this.userData.changeData(username, password);
        this.router.navigateByUrl('interests');
      }
      else alert("Registration failed!");
    });
  }

  public login(username:string, password: string){
    this.httpClient.get(`http://127.0.0.1:5000/login?username=${username}&password=${password}`,{observe: 'response'}).subscribe((res)=>{
      if(res.status==200){
        alert("Login successful!");
        this.userData.changeData(username, password);
        this.router.navigateByUrl('main');
      }
      else alert("Login failed!");
    });
  }

}
