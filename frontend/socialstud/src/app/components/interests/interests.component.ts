import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  public interest:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public submit(){
    alert(this.interest);
    let input = document.querySelector('input');
    if(input)
      input.value="";
  }

  public navigateToMain(){
    this.router.navigateByUrl('main');
  }

}
