import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {ProductInterface} from '../data-interface';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | ProductInterface[];
  productMessage:string='';
 
  constructor(private http:HttpClient, private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.productService.getAllProductService().subscribe((response)=>{
      this.productList = response;
      // console.log(response)
  })
  }

  deleteProduct(id:number){
    this.productService.deleteProductService(id).subscribe((response)=>{
       if(response){
        this.productMessage = 'Producted Delete Successfully';
        this.getAllProduct();
       }
       setTimeout(()=>{this.productMessage=''},1000)
  })

  }

}
