import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Credentials } from '../../../../core/interfaces/credentials';
import { LoginStatus } from '../../../../core/services/login.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { createLoginForm } from '../config/forms';
import { FormValidation } from '../../../../shared/utils/form-validation';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<Credentials>()

  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder)

  loginStatus = input.required<LoginStatus>()
  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = createLoginForm(this.fb);
  }

  hide = true;
  loginFailed!: boolean;

  constructor() {
    effect(() => {
      if (this.loginStatus() === 'error') {
        this.snackbarService.showError('Não foi possível autenticar usuário.')
      }
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const credentials: Credentials = this.loginForm.getRawValue();
    this.login.emit(credentials);
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    return FormValidation.getErrorMessage(control);
  }

  alert(): void {
    this.snackbarService.showAlert('Método não implementado!');
  }


}
