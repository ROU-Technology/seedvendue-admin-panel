import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../service/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  observer = {
    next: (res: any) => {
      this.toastr.success('Login Successful');
      this.router.navigate(['/']);
    },
    error: (err: any) => {
      this.toastr.error(err.message);
    },
    complete: () => console.log('Observer got a complete notification'),
  };

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });

  ngOnInit(): void {}

  onLogin() {
    this.service
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe(this.observer);
  }
}
