import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  public interest:string = "";

  constructor(private router:Router,
              private interesService: ProfileService) { }

  ngOnInit(): void {
  }

  public submit(){
    this.interesService.insertInteres(this.interest).subscribe(()=>{alert("InterestAdded!")});
  }

  public navigateToMain(){
    this.router.navigateByUrl('main');
  }


}
