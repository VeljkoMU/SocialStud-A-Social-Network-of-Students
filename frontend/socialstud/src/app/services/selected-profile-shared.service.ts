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
    this.changeData(this.profile);
  });
  
 }
}
