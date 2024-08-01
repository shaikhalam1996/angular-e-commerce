import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productMessage:string = '';
  constructor( private http:HttpClient, private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
  }

  addProduct(formData:ProductInterface){
      this.productService.addProductService(formData)
      this.productMessage = 'Product Added Successfully';
      setTimeout(()=>{
        this.productMessage=''
  
      },1000)
  }

}
