import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as R from '../../constants/routes-path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paths = [
    { value: 'Payment', path: R.payment, info: 'testing' },
    { value: 'Category', path: R.category, info: 'testing' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(path: string) {
    console.log(path);
    this.router.navigate([path]);
  }
}
