import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { debounce, debounceTime, filter, timeout } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public term:string = "";
  public selected:string = ""
  public results: User[] = [];
  constructor(private profileSrach: ProfileService) { }

  ngOnInit(): void {
  }

  public search(){
    this.results=[];
      this.profileSrach.search(this.term, this.selected)?.subscribe((data:any)=>{

  
        data.forEach((user:any)=>{
          this.results.push({
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
  }
}
