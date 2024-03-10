import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductDataService } from 'src/app/shared/services/product-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishList: any = []

  constructor(private productDataService: ProductDataService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllWishList()
  }

  removeWishListItem(productId: string): void {
    this.productDataService.deleteFromWishList(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.getAllWishList()
        this.productDataService.wishListNum.next(res.data.length)
      }
    })
  }

  addToCart(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.cartService.cartNumber.next(res.numOfCartItems)
      },
      error: (error) => {

      }
    })
  }
  getAllWishList(){
    this.productDataService.getWishList().subscribe({
      next: (res) => {
        this.wishList = res.data
      }
    })
  }
}

