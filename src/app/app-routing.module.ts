import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { SellerAuthenthicationGuard } from './seller-authenthication.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UserModuleComponent } from './user-module/user-module.component';

const routes: Routes = [
  {
    path:'',
   component:HomeComponent
  },
  {
   path:'seller',
   component:SellerComponent
  },
  {
   path:'seller-home',
   component:SellerHomeComponent,
   canActivate:[SellerAuthenthicationGuard]
  }, {
    path:'seller-add-product',
    component:AddProductComponent,
    canActivate:[SellerAuthenthicationGuard]
   }, {
    path:'seller-update-product/:id',
    component:UpdateProductComponent,
    canActivate:[SellerAuthenthicationGuard]
   },
   {
    path:'search/:text',
    component:SearchProductComponent
   },
   {
    path:'product-details/:productId',
    component:ProductDetailsComponent
   },
   {
    path:'user-auth',
    component:UserModuleComponent
   },
   {
    path:'cart-page',
    component:CartPageComponent
   },
   {
    path:'checkout',
    component:CheckoutPageComponent
   },
   {
    path:'my-order',
    component:MyOrderComponent
   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
