import { Component, OnInit } from '@angular/core';
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
  constructor(private test: ProfileService, private selectedService: SelectedProfileSharedService, private userData: UserDataSharedStateService) { }

  ngOnInit(): void {

    this.selectedService.selectedServiceChnage.subscribe((profile)=>{
      this.user=profile;
      this.interests = this.selectedService.interests;
      console.log(this.interests);
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

}
