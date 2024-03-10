import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  decodeUserData() {
    if (localStorage.getItem('token') != null) {
      let encodeToken: any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken
    }
  }

  setRegister(userData: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
  }

  setLogin(userData: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }

  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])

  }

  forgotPassword(userData: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', userData)
  }

  verifyResetCode(Code: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', Code)
  }

  resetPassword(newPass: object): Observable<any> {
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', newPass)
  }

  updateUserData(data: object): Observable<any> {
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', data)
  }

  changePassword(data: object): Observable<any> {
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', data)
  }
 
  getAllUsers():Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/users')
  }

}
