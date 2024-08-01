import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { sellerLoginInterface, sellerSignUpInterface } from '../data-interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  constructor(private http:HttpClient,private route:Router){ }

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
 
  url="http://localhost:3000";

    sellerSignUp(formData:sellerSignUpInterface){
      this.http.post(`${this.url}/seller`,formData,{observe:'response'}).subscribe((response)=>{
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('sellerDetails',JSON.stringify(response.body))
        this.route.navigate(['seller-home'])
        console.log(response)
    })

    return false;
  }
  
  reloadSeller(){
    if(localStorage.getItem('sellerDetails')){
      this.isSellerLoggedIn.next(true)
      this.route.navigate(['seller-home'])
    }
  }

  sellerLogin(formData:sellerLoginInterface){
    this.http.get(`${this.url}/seller?email=${formData.email}&password=${formData.password}`,{observe:'response'}).subscribe((result:any)=>{
      // console.log(result.body)
      if(result && result.body && result.body.length){
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('sellerDetails',JSON.stringify(result.body))
        this.route.navigate(['seller-home'])
      }else{
        console.log("Invalid Login Credentials")
        this.isLoginError.emit(true);
      }
    })

  }

}
