import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  public profiles: User[] = [];
  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    setTimeout(()=>{
    this.contactsService.getRequests().subscribe((data: any)=>{
      console.log(data);
      data.forEach((user:any)=>{
        this.profiles.push({
          username: user.properties.username,
       name:  user.properties.name,
      surname: user.properties.surname,
      location:  user.properties.location,
      faculty:  user.properties.faculty,
      email: user.properties.email,
      year: user.properties.year,
      birthdate: user.properties.birthdate
        });
      });
    });
  },3000);
  }

}
