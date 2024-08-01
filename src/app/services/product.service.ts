import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CartInterface, CheckOutInterface, ProductInterface, OrderNowInterface } from '../data-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {}

  url = "http://localhost:3000";

  cartData = new EventEmitter<ProductInterface[]|[]>()

  addProductService(formData:ProductInterface){
   return this.http.post(`${this.url}/products`,formData).subscribe((response)=>{
        console.log("Product Added")
    })
  }

  getAllProductService(){
    return this.http.get<ProductInterface[]>(`${this.url}/products`);
   }

   deleteProductService(id:number){
    return this.http.delete(`${this.url}/products/${id}`);
   }

   getOneProductService(id:string){
    return this.http.get<ProductInterface>(`${this.url}/products/${id}`);
   }

   updateProductService(formData:ProductInterface){
    return this.http.put(`${this.url}/products/${formData.id}`,formData);
   }

   sliderProductService(){
    return this.http.get<ProductInterface[]>(`${this.url}/products?_limit=3`);
   }

   topProductService(){
    return this.http.get<ProductInterface[]>(`${this.url}/products?_limit=8`);
   }

   
   searchProductService(text:string){
    return this.http.get<ProductInterface[]>(`${this.url}/products?q=${text}`);
   }

   searchProductButtonService(text:string){
    return this.http.get<ProductInterface[]>(`${this.url}/products?q=${text}`);
   }

   localStorageProduct(data:ProductInterface){
      let cartData = [];
      let localCartName = localStorage.getItem('localCartName');
      if(!localCartName){
        localStorage.setItem('localCartName',JSON.stringify([data]))
        this.cartData.emit([data])
      }else{
        cartData = JSON.parse(localCartName)
        cartData.push(data)
        localStorage.setItem('localCartName',JSON.stringify(cartData))
      }
      this.cartData.emit(cartData)
   }

   removeItemFromCart(productId:number){
      let cartData = localStorage.getItem('localCartName');
      if(cartData){
        let items:ProductInterface[] = JSON.parse(cartData);
        items = items.filter((item)=> productId != item.id)
        localStorage.setItem('localCartName',JSON.stringify(items))
        this.cartData.emit(items)
      }
   }

   addProductToJsonFile(data:CartInterface){
     return this.http.post(`${this.url}/cart`,data)
   }

   getCartList(userId:number){
    return this.http.get<ProductInterface[]>(`${this.url}/cart?userId=${userId}`,
    {observe:'response'}).subscribe((result)=>{
      // console.log(result)
        if(result && result.body){
            this.cartData.emit(result.body)
        }
    });

   }

   getProductByUserService(){
    let user = localStorage.getItem('user');
    let userObj = user && JSON.parse(user);
    let userId = userObj[0].id;
    return this.http.get<CartInterface[]>(`${this.url}/cart?userId=${userId}`);
   }

   deleteProductFromCartService(cartId:any){
    return this.http.delete(`${this.url}/cart/${cartId}`);
   }

   checkOutService(formData:CheckOutInterface){
    return this.http.post(`${this.url}/orders`,formData)
   }

   myOrderList(){
    let user = localStorage.getItem('user');
    let userObj = user && JSON.parse(user);
    let userId = userObj[0].id;
    return this.http.get<OrderNowInterface[]>(`${this.url}/orders?userId=${userId}`);
   }
  
   deleteProductFromCartAfterOrderService(cartId:any){
    return this.http.delete(`${this.url}/cart/${cartId}`,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    });
   }

   deleteOrderService(orderId:any){
    return this.http.delete(`${this.url}/orders/${orderId}`);
   }
}
