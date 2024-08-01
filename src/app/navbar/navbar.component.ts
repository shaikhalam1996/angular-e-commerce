import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    updateMenu:string = 'default';
    sellerName:string = '';
    userName:string = '';
    cartLength:number = 0;
    searchResult:undefined|ProductInterface[]
     

  constructor(private route:Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((value:any)=>{
      if(localStorage.getItem('sellerDetails') && value.url.includes('seller')){
          this.updateMenu = 'seller';
          let seller = localStorage.getItem('sellerDetails');
          let sellerObj = seller && JSON.parse(seller);
          this.sellerName = sellerObj[0].name;
      }else if(localStorage.getItem('user')){
        this.updateMenu = 'user';
        let user = localStorage.getItem('user');
        let userObj = user && JSON.parse(user);
        this.userName = userObj[0].name;
        this.productService.getCartList(userObj[0].id);
      }else{
          this.updateMenu = 'default'
      }
    })

    let cartData = localStorage.getItem('localCartName');
    if(cartData){
      this.cartLength = JSON.parse(cartData).length
    }

    this.productService.cartData.subscribe((items)=>{
        this.cartLength = items.length
    })

  }

  logout(){
    localStorage.removeItem('sellerDetails');
    this.route.navigate(['/seller']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.productService.cartData.emit([])
  }
 
  searchProduct(text:KeyboardEvent){
    if(text){
      const element = text.target as HTMLTextAreaElement
      this.productService.searchProductService(element.value).subscribe((response)=>{
        if(response.length>5){
          response.length = 5
        }
        this.searchResult = response
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined
  }

  searchBtn(text:string){
    this.route.navigate([`search/${text}`]);
  }

  redirectToComponent(id:number){
    this.route.navigate([`product-details/${id}`]);
  }

}
