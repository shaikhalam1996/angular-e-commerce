import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartInterface, ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails:ProductInterface|undefined;
  removeCart = false;
  cartDetails:ProductInterface|undefined;

  constructor(private route:ActivatedRoute,private productService:ProductService,private router:Router) { }

  quantity:number = 1
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId')
    // console.log(productId);
    productId && this.productService.getOneProductService(productId).subscribe((response)=>{
      this.productDetails=response;
      // console.log(this.productDetails);

      let cartData = localStorage.getItem('localCartName');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:ProductInterface)=>{
          productId == item.id.toString()
        })

        if(items.length){
            this.removeCart = true
        }else{
          this.removeCart = false
        }
      }

      let user = localStorage.getItem('user');

      if(user){
        let userId =user && JSON.parse(user)[0].id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result)=>{
           let item = result.filter((item:ProductInterface)=> productId?.toString() === item.productId?.toString())
            if(item.length){
              this.cartDetails = item[0]
              this.removeCart = true
            }
          })

      }
    })
  }

  handleQuantity(str:string){
    // console.log(str)
    if(this.quantity>1 && str==='sub'){
      this.quantity-=1
    }else if(this.quantity<20 && str==='add'){
      this.quantity+=1
    }
  }

  AddToCart(){
    if(this.productDetails){
      this.productDetails.quantity = this.quantity
      if(!localStorage.getItem('user')){
        this.productService.localStorageProduct(this.productDetails);
        this.removeCart = true
      }else{
        let user = localStorage.getItem('user');
        let userId =user && JSON.parse(user)[0].id;
        let cartData:CartInterface = {
          ...this.productDetails,
          userId:userId,
          productId:this.productDetails.id
        }
        delete cartData.id;
        // console.log(cartData)
        this.productService.addProductToJsonFile(cartData).subscribe((result)=>{
          if(result){
            alert('Product Stored In JSON File')
            this.productService.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }

  RemoveToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.productService.removeItemFromCart(productId)
      this.removeCart = false
    }else{
      console.log(this.cartDetails)
      let user = localStorage.getItem('user');
      let userId =user && JSON.parse(user)[0].id;
      this.cartDetails && this.productService.deleteProductFromCartService(this.cartDetails.id)
      .subscribe((result)=>{
        if(result){
          this.productService.getCartList(userId)
        }
      })
    }
    this.removeCart = false

  }

  addProductInJsonForm(data:CartInterface){
      this.productService.addProductToJsonFile(data).subscribe((result)=>{
        if(result){
          alert('Product Stored In JSON File')
        }
      })
  }

}
