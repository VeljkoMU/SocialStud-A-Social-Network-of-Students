import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { UserDataSharedStateService } from './user-data-shared-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
              private userData: UserDataSharedStateService) { }

  public getProfile(username: string){
     let myn = this.userData.getData().username;
     let myp = this.userData.getData().password;

     return this.httpClient.get(`http://127.0.0.1:5000/profile?username=${myn}&password=${myp}&prof=${username}`);
  }

  public insertInteres(name: string){
    return this.httpClient.post("http://127.0.0.1:5000/addInterest",{
      user: this.userData.getData().username,
      interest: name
    });
  }

  public getInterests(username: string){
    return this.httpClient.get(`http://127.0.0.1:5000/interestList?username=${username}`);
  }

  public recommnedations(){
    let username = this.userData.getData().username;
    let password = this.userData.getData().password;

    return this.httpClient.get(`http://127.0.0.1:5000/recomended?username=${username}&password=${password}`);
  }
}
