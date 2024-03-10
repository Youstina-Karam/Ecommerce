import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  addToCart(id: string): Observable<any> {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        "productId": id
      },
    )
  }

  getUserCart(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeItems(ProductId: string): Observable<any> {
    return this.http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`)
  }

  updateCartProduct(ProductId: string, newCount: number): Observable<any> {
    return this.http.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
      {
        count: newCount
      })
  }

  clearCart(): Observable<any> {
    return this.http.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  checkout(ProductId: string, userData: object): Observable<any> {
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ProductId}?url=http://localhost:4200`,
      {
        shippingAddress: userData
      })
  }

  getUserOrder(userId: string): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }

}
