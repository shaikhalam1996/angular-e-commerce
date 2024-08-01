import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.component.html',
  styleUrls: ['./user-module.component.css']
})
export class UserModuleComponent implements OnInit {
  showForm = true;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.reloadUser();
  }

  userSignUpForm(formData:any){
    this.userService.userSignUpService(formData);
  }

  userLoginForm(formData:any){
    this.userService.userLoginService(formData) 
  }

  openSignUp(){
    this.showForm=false
  }

  openLogin(){
    this.showForm=true
  }

}
