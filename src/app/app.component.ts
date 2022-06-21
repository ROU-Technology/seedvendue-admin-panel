import { Component, OnInit } from '@angular/core';
import { AuthService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'seedvendue-admin-panel';
  auth: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
    this.auth = this.authService.isLoggedIn();
  }
}
