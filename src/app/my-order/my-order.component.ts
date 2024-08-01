import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartInterface, CheckOutInterface, ProductInterface, OrderNowInterface } from '../data-interface';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
 
  myOrderList:OrderNowInterface[]|undefined;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.orderListUpdate();
  }

  orderListUpdate(){
    this.productService.myOrderList().subscribe((result)=>{
      console.log(result)
      this.myOrderList = result
    })
  }

  cancelOrder(orderId:any){
      this.productService.deleteOrderService(orderId).subscribe((result)=>{
        if(result){
          this.orderListUpdate();
          
          alert("Order Deleted");

        }
      })
  }

}
