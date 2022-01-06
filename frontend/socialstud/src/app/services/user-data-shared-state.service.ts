import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataSharedStateService {

  private username: string = "";
  private password: string ="";
  private dataChangeSubject: Subject<any>=new Subject<any>();

  constructor() { }

  public changeData(username: string, password: string){
    this.username = username;
    this.password = password;
  }

  public getData(){
    return {
      password: this.password,
      username: this.username
    };
  }

}
