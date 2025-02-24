import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    private readonly $router: Router
  ) {
    const lastSegment = this.$activeRouter.snapshot.url;
    this.title = lastSegment[0].path.toUpperCase();
    this.userForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmitForm() {
    try {
      const response : any = this.title === 'LOGIN'
        ? await this.$authService.loginUser(this.userForm.value).toPromise()
        : await this.$authService.registerUser(this.userForm.value).toPromise();
  
      if (response?.hasOwnProperty('token')) {
        localStorage.setItem('token', response?.token);
        this.$router.navigate(['/']);
      } else {
        console.error('No token received in response');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
