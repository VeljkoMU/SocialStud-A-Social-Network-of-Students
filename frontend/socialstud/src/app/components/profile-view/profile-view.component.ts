import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SelectedProfileSharedService } from 'src/app/services/selected-profile-shared.service';
import { UserDataSharedStateService } from 'src/app/services/user-data-shared-state.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public user: User = {
    username: "",
    name: "",
    surname: "",
    location: "",
    faculty: "",
    email: "",
    year: "",
    birthdate: ""
  };

  public interests: string[] = ["hiking", "backpacking", "video games", "backpacking","backpacking","backpacking","backpacking","backpacking","backpacking","backpacking","backpacking"];
  public isAllowed: boolean = false;
  constructor(private test: ProfileService, private selectedService: SelectedProfileSharedService, private userData: UserDataSharedStateService,
              private conactsService: ContactsService) { }

  ngOnInit(): void {

    this.selectedService.selectedServiceChnage.subscribe((profile)=>{
      this.user=profile;
      this.interests = this.selectedService.interests;
      console.log(this.interests);
      let test: any[] = this.userData.contactList.filter((u: User)=>u.username===this.user.username);
      console.log(test);
      if(test.length!=0){
       // alert("1");
        this.isAllowed=true;
      }
      else if(this.userData.getData().username===this.user.username){
      //  alert("2");
        this.isAllowed=true;
      }
      else{
      //  alert("3");
        this.isAllowed=false;
      }
    });

    this.selectedService.initData();
    // this.test.getProfile(this.userData.getData().username).subscribe((profile: any)=>{
    //   this.user= {
    //     username: profile.username,
    //     name: profile.name,
    //     surname: profile.surname,
    //     location: profile.location,
    //     faculty: profile.faculty,
    //     email: profile.email,
    //     year: profile.year,
    //    birthdate: profile.birthdate
    // }
    // });
  }

  public sendRequest(){
    alert("Evo me!");
    this.conactsService.sendRequest(this.user.username).subscribe(()=>{
      alert("Request sent!");
    });
  } 

}
