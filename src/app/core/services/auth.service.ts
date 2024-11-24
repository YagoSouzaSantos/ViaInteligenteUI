import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, delay, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { SnackbarService } from './snackbar.service';
import { Credentials } from '../interfaces/credentials';
import { environment } from '../../../environments/environment';

export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private snackbarService = inject(SnackbarService);
  private router = inject(Router)

  private userSignal: WritableSignal<AuthUser> = signal<AuthUser>(null);

  user() {
    return this.userSignal.asReadonly();
  }

  login(credentials: Credentials): Observable<AuthUser> {
    const { identification: email, password } = credentials;

    return this.http.get<AuthUser[]>(`${environment.apiUrl}/users`, {
      params: { email, password }
    }).pipe(
      map((users) => {
        const user = users.length ? users[0] : null;

        if (user) {
          this.userSignal.set(user);
          this.snackbarService.showSuccess('Usuário autenticado com sucesso.')
          return user;
        } else {
          throw new Error('Usuário ou senha inválidos');
        }
      }),
      catchError((error) => {
        this.userSignal.set(null);
        if (error.message === 'Usuário ou senha inválidos') {
          return throwError(() => new Error('Usuário ou senha inválidos'));
        }
        return throwError(() => new Error('Erro no servidor. Tente novamente mais tarde.'));
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map(users => users.some(user => user.identification === email)),
      catchError(() => of(false))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  logout(): void {
    this.userSignal.set(null);
    this.router.navigate(['login'])
  }

  isLoggedIn(): boolean {
    return this.userSignal() != null;
  }

}
