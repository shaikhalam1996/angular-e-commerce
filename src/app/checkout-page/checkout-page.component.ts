import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckOutInterface, CartInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router) { }
  totalPrice:number|undefined;
  cartData:CartInterface[]|undefined;

  ngOnInit(): void {
    this.productService.getProductByUserService().subscribe((result)=>{
      if(result){
        this.cartData = result;
        let price = 0;
          result.forEach((item)=>{
            if(item.quantity){
              price = price + (+item.product_price * +item.quantity)
            }
        })
        price = price + (price/10) + 100 - (price/5) 
        this.totalPrice = price;
      }
    })
  }

  checkOutFormData(formData:CheckOutInterface){
    let user = localStorage.getItem('user');
    let userObj = user && JSON.parse(user);
    let userId = userObj[0].id;
    if(this.totalPrice){
      let orderNowObj = {
        ...formData,
        totalPrice:this.totalPrice,
        userId:userId
      }

      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          item && this.productService.deleteProductFromCartAfterOrderService(item.id)
        },600)
          
      })

      this.productService.checkOutService(orderNowObj).subscribe((result)=>{
        if(result){
          // alert('Your Order Has Been Placed');
          setTimeout(()=>{
            this.router.navigate(['my-order']);
          },5000)
        }
      })
      
    }
  }

}
