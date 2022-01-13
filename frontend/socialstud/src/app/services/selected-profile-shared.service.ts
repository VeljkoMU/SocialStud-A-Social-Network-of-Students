import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/models/user';
import { ProfileService } from './profile.service';
import {map} from "rxjs/operators";
import { UserDataSharedStateService } from './user-data-shared-state.service';
//import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SelectedProfileSharedService {

 public profile: User = {
  username: "",
  name: "",
  surname: "",
  location: "",
  faculty: "",
  email: "",
  year: "",
  birthdate: ""
};

public interests: string[] = [];

public contacts: User[] =[];

public selectedServiceChnage: EventEmitter<User> = new EventEmitter<User>();


constructor(private httpCient: HttpClient,
            private profileSerrvice: ProfileService,
            private userData: UserDataSharedStateService) { }

public changeData(prof: User){
  this.profile = prof;
  this.profileSerrvice.getInterests(prof.username).pipe(
    map((data: any)=>{
      console.log(data);
      let nizNaziva: any[] = [];
      data.forEach((interest: any)=>nizNaziva.push(interest.name));
      this.getContacts();
      return nizNaziva;
    })
  ).subscribe((niz: any)=>{
    this.interests = niz
    this.selectedServiceChnage.emit(this.profile);
  });
  
 }

 public async initData(){
  this.profileSerrvice.getProfile(this.userData.getData().username).subscribe((prof: any)=>{
    this.profile = {
      username: prof.username,
       name:  prof.name,
      surname:  prof.surname,
      location:  prof.location,
      faculty:  prof.faculty,
      email: prof.email,
      year: prof.year,
      birthdate: prof.birthdate
    }
    setTimeout(()=>{
    this.changeData(this.profile);
    },200);
  });
  
 }

 public getContacts(){
   console.log(this.profile.username);
  this.profileSerrvice.getContacts(this.profile.username).subscribe((data:any)=>{
    this.contacts=[];
    data.forEach((user:any)=>{
      this.contacts.push({
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
 }
}
