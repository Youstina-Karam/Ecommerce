import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductDataService } from 'src/app/shared/services/product-data.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  cartNum: number = 0;
  wishListNum: number = 0;
  username:string=''
  constructor(private authService: AuthService, private cartService: CartService,
    private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.authService.decodeUserData()
    this.username =this.authService.userData.name

    this.cartService.cartNumber.subscribe({
      next: (res) => {
        this.cartNum = res
      }
    })

    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems
      }
    })

    this.productDataService.wishListNum.subscribe({
      next: (res) => {
        this.wishListNum = res
      }
    })

    this.productDataService.getWishList().subscribe({
      next: (res) => {
        this.wishListNum = res.count
      }
    })
  }

  logout(): void {
    this.authService.logout()
  }
}
