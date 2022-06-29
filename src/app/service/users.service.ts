import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { uri } from '../constants/backend';
import { ReceivedUsers } from '../shared/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  authToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers(
    query: string,
    cursorId?: string | boolean
  ): Observable<ReceivedUsers[]> {
    if (!cursorId) {
      query = 'first';
      cursorId = '';
    }
    this.authToken = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }),
    };

    return this.http
      .get<ReceivedUsers[]>(
        `${uri}/admin/users?query=${query}&cursorId=${cursorId}`,
        options
      )
      .pipe(
        tap((res) => {
          // console.log(res);
        }),
        catchError((err) => {
          this.handleError;
          return throwError(() => {
            return err.error;
          });
        })
      );
  }

  deleteUserById(id: string): Observable<any> {
    this.authToken = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }),
    };

    return this.http
      .delete<any>(`${uri}/admin/delete/user/${id}`, options)
      .pipe(
        tap((res) => {
          // console.log(res);
        }),
        catchError((err) => {
          this.handleError;
          return throwError(() => {
            return err;
          });
        })
      );
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
