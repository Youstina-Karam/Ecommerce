import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
 wishListNum:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getProductDetails(id: string): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getCategories(): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  getSubCategories(categoryId: string): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
  }

  getBrands(): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  //wish list api

  getWishList(): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }

  addToWishList(productId: string): Observable<any> {
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        "productId": productId
      }
    )
  }

  deleteFromWishList(productId: string): Observable<any> {
    return this.http.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
  }


}
