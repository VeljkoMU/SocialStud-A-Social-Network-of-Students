import { Component, Input, OnInit, Output } from '@angular/core';
import { SelectedProfileSharedService } from 'src/app/services/selected-profile-shared.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-profile-thumbnail',
  templateUrl: './profile-thumbnail.component.html',
  styleUrls: ['./profile-thumbnail.component.css']
})
export class ProfileThumbnailComponent implements OnInit {

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

  constructor(private selectedp: SelectedProfileSharedService) { }

  ngOnInit(): void {
  }

  public selectProfile(){
    this.selectedp.changeData(this.profile);
  }

}
