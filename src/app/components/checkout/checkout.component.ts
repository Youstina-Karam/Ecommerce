import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartId: any = ''
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id');
      }
    })
  }

  checkout: FormGroup = this.formBuilder.group({
    details: ['',[Validators.required]],
    phone: ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['',[Validators.required]]
  })

  Payment() {
    this.cartService.checkout(this.cartId, this.checkout.value).subscribe({
      next: (res) => {
        if (res.status == "success") {
          open(res.session.url, '_self')
        }
      },
      error: (error) => {

      }
    })
  }
}
