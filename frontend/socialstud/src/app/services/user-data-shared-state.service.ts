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
  public contactList: User[]=[];
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
      console.log("kontakti: ");
      console.log(data);
      data.forEach((user:any)=>{
        this.contactList.push({
          username: user._fields[0].properties.username,
          name: user._fields[0].properties.name,
          surname: user._fields[0].properties.surname,
          location: user._fields[0].properties.location,
           faculty: user._fields[0].properties.faculty,
          email: user._fields[0].properties.email,
          year: user._fields[0].properties.year,
           birthdate: user._fields[0].properties.birthdate
        });
      });
    });
    console.log("Contcts: ")
    console.log(this.contactList);
    },500);
  }

  public getData(){
    return {
      password: this.password,
      username: this.username
    };
  }

}
