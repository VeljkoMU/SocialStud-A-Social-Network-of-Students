import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  public profiles: User[]= [];
  constructor(private pS: ProfileService) { }

  ngOnInit(): void {
    this.pS.recommnedations().subscribe((data: any)=>{
        data.forEach((profil: any)=>{
          this.profiles.push({
            username: profil.username,
            name: profil.name,
            surname: profil.surname,
             location: profil.location,
             faculty: profil.faculty,
            email: profil.email,
            year: profil.year,
             birthdate: profil.birthdate
          });
        });
    });
  }

}
