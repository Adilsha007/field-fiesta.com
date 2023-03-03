import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { OtpUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';
import {
  adminloginStart,
  adminloginSuccess,
  loginStart,
  loginSuccess,
  logout,
  logoutSuccess,
  otpStart,
  signupProgress,
  signupStart,
  signupSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      mergeMap((action) =>
        this.authService
          .signup(action.username, action.email, action.phoneno)
          .pipe(
            map((data) => {
              const user = new OtpUser(
                action.username,
                action.email,
                action.phoneno,
                action.password
              );
              this.authService.setOtpUserInLocalStorage(user);
              this.store.dispatch(setErrorMessage({ message: data.message }));
              return signupProgress();
            }),
            catchError((errorResp) => {
              const errorMessage = errorResp.error.message;
              return of(setErrorMessage({ message: errorMessage }));
            })
          )
      )
    )
  );

  otpRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signupProgress),
        map((action) => {
          this.router.navigate(['/auth/otp']);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  otpSubmit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(otpStart),
      mergeMap((action) => {
        const otp = action.otp;
        const user = this.authService.getOtpUserFromLocalStorage();
        return this.authService
          .otpSubmit(
            user.username,
            user.email,
            user.phoneno,
            user.password,
            otp
          )
          .pipe(
            map((data) => {
              this.store.dispatch(setErrorMessage({ message: data.message }));
              return signupSuccess();
            })
          );
      }),
      catchError((errorResp) => {
        const errorMessage = errorResp.error.message;
        return of(setErrorMessage({ message: errorMessage }));
      })
    );
  });

  signupRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signupSuccess),
        map((action) => {
          localStorage.removeItem('otpData');
          this.router.navigate(['/auth/login']);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formateUser(data);
            this.store.dispatch(
              setErrorMessage({ message: 'Successfully logged In' })
            );
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errorResp) => {
            const errorMessage = errorResp.error.message;
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        map((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  adminlogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminloginStart),
      mergeMap((action) => {
        return this.authService.adminLogin(action.email, action.password).pipe(
          map((data) => {
            const admin = this.authService.formateAdmin(data);
            this.store.dispatch(
              setErrorMessage({ message: 'Successfully logged In' })
            );
            return adminloginSuccess({ admin, redirect: true });
          }),
          catchError((errorResp) => {
            const errorMessage = errorResp.error.message;
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  adminLoginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(adminloginSuccess),
        map((action) => {
          if (action.redirect) {
            this.router.navigate(['/admin/dashboard']);
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: data.message }));
            localStorage.removeItem('userData');
            return logoutSuccess();
          }),
          catchError((errorResp) => {
            console.log(errorResp);
            const errorMessage = errorResp.error.message;
            return of(setErrorMessage({ message: errorMessage }));
          })
        )
      ),
      tap(() => this.router.navigate(['/']))
    )
  );
}
