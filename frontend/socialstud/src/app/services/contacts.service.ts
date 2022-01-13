import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataSharedStateService } from './user-data-shared-state.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private userData:UserDataSharedStateService,
              private httpClient: HttpClient) { }


public sendRequest(username: string){
  return this.httpClient.post("http://127.0.0.1:5000/request", {
    sourceUser:{
      username: this.userData.getData().username,
      password: this.userData.getData().password
    },
    destUser:{
      username: username
    }
  });
}

public getRequests(){
  let myn = this.userData.getData().username;
  let myp = this.userData.getData().password;

  return this.httpClient.get(`http://127.0.0.1:5000/request?username=${myn}&password=${myp}`);
}

public accept(username:string){
  return this.httpClient.put("http://127.0.0.1:5000/accept", {
    destUser:{
      username: this.userData.getData().username,
      password: this.userData.getData().password
    },
    srcUser:{
      username:username
    }
  });
}
  
}
