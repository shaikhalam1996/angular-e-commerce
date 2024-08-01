import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartInterface, PriceSummaryInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartDetails:CartInterface[]|undefined;
  priceSummary:PriceSummaryInterface={
    price:0,
    discount:0,
    tax:0,
    delievery:0,
    totalAmount:0,
}
  constructor(private productService:ProductService,private route:Router) { }

  ngOnInit(): void {
    this.cartDataUpdate()
    
  }

  cartDataUpdate(){
    this.productService.getProductByUserService().subscribe((result)=>{
      console.log(result)
      if(result){
        this.cartDetails = result
        let price = 0;
          result.forEach((item)=>{
            if(item.quantity){
              price = price + (+item.product_price * +item.quantity)
            }
        })
        this.priceSummary.price = price;
        this.priceSummary.delievery = 100;
        this.priceSummary.tax = price/10;
        this.priceSummary.discount = price/5;
        this.priceSummary.totalAmount = this.priceSummary.price + this.priceSummary.delievery + 
        this.priceSummary.tax - this.priceSummary.discount

      }
    })
  }

  deleteProductFromCart(cartId:any){
    // console.log(cartId)
    this.productService.deleteProductFromCartService(cartId).subscribe((result)=>{
      if(result){
        // this.productMessage = 'Producted Delete Successfully';
        let user = localStorage.getItem('user');
        let userObj = user && JSON.parse(user);
        let userId = userObj[0].id;
        this.productService.getCartList(userId);
        this.cartDataUpdate()
        alert("Product Deleted From Cart")
       }

    })
  }

  checkoutPage(){
    this.route.navigate(['checkout'])
  }

}
