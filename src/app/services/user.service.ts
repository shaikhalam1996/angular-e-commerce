import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { CartInterface, ProductInterface } from '../data-interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private route:Router,private productService:ProductService) { }
   
  url="http://localhost:3000";

  userSignUpService(formData:any){
    this.http.post(`${this.url}/user`,formData,{observe:'response'}).subscribe((response)=>{
      if(response){
        localStorage.setItem('user',JSON.stringify(response.body));
        this.route.navigate(['/'])
      }
    })
  }

  userLoginService(formData:any){
    this.http.get(`${this.url}/user?email=${formData.email}&password=${formData.password}`,{observe:'response'}).subscribe((response:any)=>{
      if(response && response.body && response.body.length){
        localStorage.setItem('user',JSON.stringify(response.body));
        this.localRemoteStorage();
        this.route.navigate(['/']);
      }else{
        alert("User Not Found")
      }
    })
  }

  localRemoteStorage(){
    let cartItem = localStorage.getItem('localCartName');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;

    if(cartItem){
      let cartDataList:ProductInterface[] = JSON.parse(cartItem);

      cartDataList.forEach((product:ProductInterface,index) => {
        let cart:CartInterface = {
          ...product,
          productId:product.id,
          userId:userId
        }

        delete cart.id;
        setTimeout(()=>{
              this.productService.addProductToJsonFile(cart).subscribe((result)=>{
                  if(result){
                      console.log("Item Stored inJSON File")
                  }
              })
              if(cartDataList.length == index+1){
                  localStorage.removeItem('localCartName')
              }
        },500)
      });

      this.productService.getCartList(userId)
      // setTimeout(()=>{
      // },500)

    }
  }

  reloadUser(){
    if(localStorage.getItem('user')){
      // this.isSellerLoggedIn.next(true)
      this.route.navigate(['/'])
    }
  }
}
