import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { uri } from '../constants/backend';
import { ReceivedCategory } from '../shared/category.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  authToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers() {

    this.authToken = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }),
    }

    return this.http
    .get<ReceivedCategory[]>(`${uri}/admin/users`, options)
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

  deleteUserById() {

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


{
  "id": "cl4cpoou604980jr2ah9xh57t",
  "email": "preyeopudu@gmail.com",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$XFBJNoS+s36AxwIyY28AdA$PlhxaeFgjWG0XtxVCQ0NVAqCYDkusf9UBHiHaO+Z0Eg",
  "firstName": "preye",
  "lastName": "opudu",
  "mobile": "wwwww",
  "profilePic": "preyeopudu@gmail.com_profileImage-1bde.jpg",
  "profilePicUrl": "http://seedvendue-server.captain-oracle.routechnology.tech/users/preyeopudu@gmail.com_profileImage-1bde.jpg",
  "address": "lagos",
  "stripeId": "cus_LrwG8VDoi6cjIQ",
  "role": "user",
  "createdAt": "2022-06-13T12:28:31.804Z",
  "updatedAt": "2022-06-17T19:14:58.770Z"
}
