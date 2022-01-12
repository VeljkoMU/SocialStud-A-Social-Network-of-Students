import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/user';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataSharedStateService {

  private username: string = "";
  private password: string ="";
  private contactList: User[]=[];
  private dataChangeSubject: Subject<any>=new Subject<any>();

  constructor(private httpClient:HttpClient) { }
  public getContacts(usernameProf: string){
    let username = this.username;
    let password = this.password;

    return this.httpClient.get(`http://127.0.0.1:5000/contacts?username=${username}&password=${password}&prof=${usernameProf}`);
  }

  public changeData(username: string, password: string){
    this.username = username;
    this.password = password;
    setTimeout(()=>{
    this.getContacts(username).subscribe((data:any)=>{
      data.forEach((user:any)=>{
        this.contactList.push({
          username: user.username,
          name: user.name,
          surname: user.surname,
          location: user.location,
           faculty: user.faculty,
          email: user.email,
          year: user.year,
           birthdate: user.birthdate
        });
      });
    });
    console.log(this.contactList);
    },800);
  }

  public getData(){
    return {
      password: this.password,
      username: this.username
    };
  }

}
