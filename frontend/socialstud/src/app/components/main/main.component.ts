import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public ready: boolean = false;
  public p: User={
    username: "Sara",
    name: "Smaric",
    surname: "Smaric",
    location: "Nis",
    faculty: "Medicniski",
    email: "sar@smara.com",
    year: "3",
    birthdate: "14.5.1999."
  }
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.ready=true;
    },500);
  }

}
