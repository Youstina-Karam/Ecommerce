import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  showErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
  }
  
  constructor() { }
}
