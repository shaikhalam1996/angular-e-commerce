import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../data-interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sliderData:undefined|ProductInterface[];
  topProductData:undefined|ProductInterface[];

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.sliderProductService().subscribe((response)=>{
      this.sliderData = response
    })

    this.productService.topProductService().subscribe((response)=>{
      // console.log(response)
      this.topProductData = response
    })

  }

}
