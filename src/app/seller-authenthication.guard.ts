import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerServiceService } from './services/seller-service.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthenthicationGuard implements CanActivate {
  constructor(private sellerService:SellerServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(localStorage.getItem('sellerDetails')){
        return true;
      }
     return this.sellerService.isSellerLoggedIn;
  }
  
}
