import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
 productDetails:ProductInterface|undefined;
 productMessage:string = '';
 
  constructor(private route:ActivatedRoute,private productService:ProductService,private router:Router) {
 
   }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    // console.log(productId);
    productId && this.productService.getOneProductService(productId).subscribe((response)=>{
      // console.log(response);
      this.productDetails=response;

    })
  }

  updateProduct(formData:ProductInterface){
    if(this.productDetails){
      formData.id = this.productDetails.id
    }
    // console.log(formData)
    this.productService.updateProductService(formData).subscribe((response)=>{
      if(response){
        this.productMessage = 'Product Updated Successfully'
      }
      setTimeout(()=>{
        this.productMessage=''
        this.router.navigate(['seller-home'])},1000)
    })
  }

}
