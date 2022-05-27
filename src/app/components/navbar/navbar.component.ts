import { Component, OnInit } from '@angular/core';
import * as R from '../../constants/routes-path';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  R = R;

  constructor() {}

  ngOnInit(): void {}
}
