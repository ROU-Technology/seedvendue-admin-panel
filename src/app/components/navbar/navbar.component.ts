import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../service';
import * as R from '../../constants/routes-path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  R = R;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    // console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
