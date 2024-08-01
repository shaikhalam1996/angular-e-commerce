import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sellerLoginInterface, sellerSignUpInterface } from '../data-interface';
import { SellerServiceService } from '../services/seller-service.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  loginError = '';
  constructor(private seller:SellerServiceService,private route:Router) { }
  showForm = true;
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  sellerForm(formData:sellerSignUpInterface){
    this.seller.sellerSignUp(formData)
  }

  sellerLoginForm(formData:sellerLoginInterface){
    this.loginError = "";
    this.seller.sellerLogin(formData);
    this.seller.isLoginError.subscribe((result)=>{
      if(result){
        this.loginError = "Invalid Login Credentials";
      }
    })
  }

  openSignUp(){
    this.showForm=false
  }

  openLogin(){
    this.showForm=true
  }

}
