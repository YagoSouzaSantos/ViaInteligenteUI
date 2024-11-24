import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Credentials } from '../interfaces/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authService = inject(AuthService);

  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // Controla o estado da autenticação através do status
  private state = signal<LoginState>({
    status: 'pending',
  });

  status = computed(() => this.state().status);

  authenticate(credentials: Credentials) {
    this.login$.next(credentials);
  }

  // atualiza o estado do login
  constructor() {
    this.userAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'success' }))
      );

    this.login$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'authenticating' }))
      );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'error' }))
      );
  }
}
