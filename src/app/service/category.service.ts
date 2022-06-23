import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { uri } from '../constants/backend';
import {
  ReceivedCategory,
  ReceivedSubCategory,
} from '../shared/category.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  authToken: any;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategories(): Observable<ReceivedCategory[]> {
    // add authorization header with jwt token
    this.authToken = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }),
    };
    // console.log(this.authToken);
    return this.http
      .get<ReceivedCategory[]>(`${uri}/admin/category`, options)
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

  getSubCategories(): Observable<ReceivedSubCategory[]> {
    // add authorization header with jwt token
    this.authToken = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }),
    };
    // console.log(this.authToken);
    return this.http
      .get<ReceivedSubCategory[]>(`${uri}/product/subcategory/all`, options)
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
