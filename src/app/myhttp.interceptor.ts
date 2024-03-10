import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';
import { ErrorhandlerService } from './shared/services/errorhandler.service';
import { Router } from '@angular/router';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService,
    private errorHandlerService: ErrorhandlerService,
    private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    let header: any = { token: localStorage.getItem('token') }

    if (localStorage.getItem('token') !== null) {
      request = request.clone({
        setHeaders: header
      })
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoading(); // Hide loading indicator after the request
      }),
     // catchError((error: HttpErrorResponse) => {
       // console.log(error)
        //const errorMessage = this.getErrorMessage(error);
        //this.errorHandlerService.showErrorMessage(errorMessage);

        // Rethrow the error to propagate it further
      //  return throwError(error);
    //  })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    // Customize the error message based on your application's requirements
    if (error.status === 404) {
       this.router.navigate(['/404']);
      return '';
    } else {
      return 'An unexpected error occurred. Please try again later.';
    }
  }
}
