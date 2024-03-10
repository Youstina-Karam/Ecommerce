import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductDataService } from 'src/app/shared/services/product-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productData: Product = {} as Product;
  productSliderOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    items: 1 ,
    nav: false
  }
  constructor(private activatedRoute: ActivatedRoute,
    private productDataService: ProductDataService,
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id')
        this.productDataService.getProductDetails(id).subscribe({
          next: (res) => {
            this.productData = res.data;
          },
          error: (error) => {
          }
        })
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
}
