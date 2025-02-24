import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtServiceService } from '../../../services/jwt-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected title = '';
  protected userForm!: FormGroup;

  constructor(
    private readonly $activeRouter: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly $authService: AuthService,
    private readonly $router: Router,
    private readonly $jwt: JwtServiceService
  ) {
    const lastSegment = $activeRouter.snapshot.url;
    this.title = lastSegment[0].path.toUpperCase();
    this.userForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    if (this.title === 'LOGIN') {
      this.$authService
        .loginUser(this.userForm.value)
        .subscribe((resposne: any) => {
          if (resposne.hasOwnProperty('token')) {
            localStorage.setItem('token', resposne.token);
            this.$router.navigate(['/']);
          }
        });
    } else {
      this.$authService
        .registerUser(this.userForm.value)
        .subscribe((resposne: any) => {
          if (resposne.hasOwnProperty('token')) {
            localStorage.setItem('token', resposne.token);
            this.$router.navigate(['/']);
          }
        });
    }
  }
}
