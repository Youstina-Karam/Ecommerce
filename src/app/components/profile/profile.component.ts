import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMsg: string = ''
  passMsgErr:string =''
  isLoading: boolean = false
  userData: any
  updateProfileForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })

  updatePasswordForm: FormGroup = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
    rePassword: ['']
  }, { validators: [this.confirmPassword] } as FormControlOptions)

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  updateProfile() {
    this.authService.updateUserData(this.updateProfileForm.value).subscribe({
      next: (res) => {
        this.toastr.success("Update profile success")
        this.updateProfileForm.reset();
        this.errorMsg = ''
      },
      error: (error) => {
        this.errorMsg = error.error.errors.msg
      }
    })
  }

  confirmPassword(group: FormGroup): void {
    let password = group.get('password')
    let rePassword = group.get('rePassword')

    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true })
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }

  }

  updatePassword() {
    this.authService.changePassword(this.updatePasswordForm.value).subscribe({
      next: (res) => {
        this.toastr.success("Update profile success")
        this.updatePasswordForm.reset();
      },
      error: (error) => {
        this.passMsgErr = error.error.errors.msg
      }
    })
  }
}
