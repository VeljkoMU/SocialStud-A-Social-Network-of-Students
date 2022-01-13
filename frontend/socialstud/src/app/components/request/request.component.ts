import { Component, Input, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { User } from 'src/models/user';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() public profile: User = {
    username: "",
    name: "",
    surname: "",
    location: "",
    faculty: "",
    email: "",
    year: "",
    birthdate: ""
  }

  public active: boolean = true;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  public accept(){
    alert("Radim!");
    this.contactsService.accept(this.profile.username).subscribe(()=>{
      this.active = false;
  })
  }

}
