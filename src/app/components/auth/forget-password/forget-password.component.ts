import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  errorMsg: string = ''
  isLoading: boolean = false

  constructor(private formBuilder: FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private router: Router) { }

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]]
  })

  verify(){
   this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
    next:(res)=>{
      if(res.statusMsg == 'success'){
        this.toastr.success(res.message);
        this.router.navigate(['/auth/verify-code'])
      }
    },
    error: (error) => {
      this.isLoading = false
      this.errorMsg = error.error.message
    }
   })
  }
}
