import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  constructor(private route:ActivatedRoute, private productService:ProductService) { }
  productList:undefined | ProductInterface[];

  ngOnInit(): void {
    let text = this.route.snapshot.paramMap.get('text')
    text && this.productService.searchProductButtonService(text).subscribe((response)=>{
      // console.log(response);
      this.productList=response;
    })
  }



}
