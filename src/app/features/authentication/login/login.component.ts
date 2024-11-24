import { Component, effect, inject } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoginService } from '../../../core/services/login.service';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/interfaces/credentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatProgressSpinner, MatCard, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.authService.user()();
      console.log('user: ', user);
      if (user !== null && user !== undefined) {
        this.router.navigate(['home']);
      }
    });
  }

  onLogin(credentials: Credentials) {
    this.loginService.authenticate(credentials);
  }
}
