import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMsg: string = ''
  isLoading: boolean = false

  resetPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router){}

    resetPass() {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
            localStorage.setItem('token', res.token)
            this.authService.decodeUserData()
            this.router.navigate(['/home'])
        },
        error: (error) => {
          this.isLoading = false
          this.errorMsg = error.error.message
        }
      })
    }
}
