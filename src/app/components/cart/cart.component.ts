import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProduct: any = {}
  totalItems:number=0;
  errorMsg:boolean=false
  constructor(private cartService: CartService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartProduct = res.data
        this.totalItems =res.numOfCartItems
      },
      error: (error) => {
        this.errorMsg = true
      }
    })

  }
  removeCartItem(id: string): void {
    this.cartService.removeItems(id).subscribe({
      next: (res) => {
        this.cartProduct = res.data
        this.toastr.success("Product removed successfully to your cart");
        this.cartService.cartNumber.next(res.numOfCartItems)
      },
      error: (error) => {
       
      }
    })
  }
  changeCount(id: string, count: number): void {
    if (count > 0) {
      this.cartService.updateCartProduct(id, count).subscribe({
        next: (res) => {
          this.cartProduct = res.data
        },
        error: (error) => {
        }
      })
    }
  }

  clearCart():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message =='success') this.router.navigate(['/home'])
      }
    })
  }
}
