import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  errorMsg: string = ''
  isLoading: boolean = false

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  verifyForm: FormGroup = this.formBuilder.group({
    resetCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  })

  sendCode() {
    this.authService.verifyResetCode(this.verifyForm.value).subscribe({
      next: (res) => {
        if (res.status == "Success") {
          this.toastr.success("Reset code sent success");
          this.router.navigate(['/auth/reset-password'])
        }
      },
      error: (error) => {
        this.isLoading = false
        this.errorMsg = error.error.message
      }
    })
  }
}
