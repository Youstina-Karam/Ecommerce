import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() filterProduct: any[] =[]
  products: Product[] = []
  searchTerms: string = ''
  wishListProduct: any[] = []

  constructor(private productDataService: ProductDataService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.filterProduct.length !== 0){
      this.products =this.filterProduct
    }else{
      this.productDataService.getAllProduct().subscribe({
        next: (res) => {
          this.products = res.data
        },
        error: (error) => {
        }
      })
    }
   


    this.productDataService.getWishList().subscribe({
      next: (res) => {
        this.wishListProduct = res.data.map((item: any) => item._id)
      },
      error: (error) => {
      }
    })

    this.productDataService.getWishList().subscribe({
      next: (res) => {
        this.wishListProduct = res.data.map((item: any) => item._id)
      },
      error: (error) => {
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

  wishListToggle(productId: string): void {
    if (!this.wishListProduct.includes(productId)) {
      this.productDataService.addToWishList(productId).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.wishListProduct = res.data
          this.productDataService.wishListNum.next(res.data.length)
        }
      })
    } else {
      this.productDataService.deleteFromWishList(productId).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.wishListProduct = res.data
          this.productDataService.wishListNum.next(res.data.length)
        }
      })
    }
  }

}

