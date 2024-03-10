import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMsg: string = ''
  isLoading: boolean = false
  constructor(private authService: AuthService,
    private router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:[this.confirmPassword]}as FormControlOptions)

  submit() {
    if (this.registerForm.valid) {
      this.isLoading = true
      this.authService.setRegister(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isLoading = false
            this.router.navigate(['/auth/login'])
          }
        },
        error: (error) => {
          this.isLoading = false
          this.errorMsg = error.error.message
        }
      })
    }else{
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(group:FormGroup):void{
   let password = group.get('password')
   let rePassword = group.get('rePassword')

   if(rePassword?.value == ''){
    rePassword.setErrors({required:true})
   }else if(password?.value !== rePassword?.value){
    rePassword?.setErrors({mismatch:true})
   }

  }
}
