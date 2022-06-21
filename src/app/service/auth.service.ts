import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { uri } from '../constants/backend';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string | null;
  auth: boolean = false;
  user!: object | null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${uri}/auth/admin-signin`, { email, password })
      .pipe(
        tap((res) => {
          // console.log(res);
          this.saveToken(res.token);
          this.user = res.user;
          this.auth = true;
        }),

        catchError((err) => {
          this.handleError;
          // console.log(err);
          return throwError(() => {
            return err.error;
          });
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
    this.auth = false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
        error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
