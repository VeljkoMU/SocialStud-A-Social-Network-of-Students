import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { SelectedProfileSharedService } from 'src/app/services/selected-profile-shared.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: User[] = [

  ];

  constructor(private selectedService: SelectedProfileSharedService) { 


  }

  ngOnInit(): void {
    this.selectedService.selectedServiceChnage.subscribe((prof: User)=>{
      setTimeout(()=>{
      this.contacts= this.selectedService.contacts;
      }, 300);
      console.log("KKK:");
      console.log(this.selectedService.contacts);
    });
}
}
