import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './service';

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnDestroy {
  constructor(private auth: AuthService) {}

  ngOnDestroy(): void {
    this.auth.logout();
  }
}
