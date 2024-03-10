import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
userOrderList:any=[]

  constructor(private authService: AuthService, private cartService: CartService) {
    this.authService.decodeUserData()
  }

  ngOnInit(): void {
    this.cartService.getUserOrder(this.authService.userData.id).subscribe({
      next: (res) => {
        this.userOrderList =res[0]
      },
      error: (error) => {

      }
    })
  }
}
