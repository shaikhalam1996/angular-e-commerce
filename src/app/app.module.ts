import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { FormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserModuleComponent } from './user-module/user-module.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MyOrderComponent } from './my-order/my-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SellerComponent,
    SellerHomeComponent,
    AddProductComponent,
    UpdateProductComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    UserModuleComponent,
    CartPageComponent,
    CheckoutPageComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
