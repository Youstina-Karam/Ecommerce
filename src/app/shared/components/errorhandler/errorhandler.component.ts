import { Component } from '@angular/core';
import { ErrorhandlerService } from '../../services/errorhandler.service';

@Component({
  selector: 'app-errorhandler',
  templateUrl: './errorhandler.component.html',
  styleUrls: ['./errorhandler.component.css']
})
export class ErrorhandlerComponent {
  errorMessage$ = this.errorHandlerService.errorMessage$;
  
  constructor(private errorHandlerService: ErrorhandlerService){}

}
