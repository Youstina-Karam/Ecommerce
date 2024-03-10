import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg: string = ''
  isLoading: boolean = false

  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) {

  }
  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl(null ,[Validators.required]),
  //   password: new FormControl(null,[Validators.required])
  // })
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]]
  })

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this.authService.setLogin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isLoading = false
            localStorage.setItem('token', res.token)
            this.authService.decodeUserData()
            this.router.navigate(['/home'])
          }
        },
        error: (error) => {
          this.isLoading = false
          this.errorMsg = error.error.message
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
