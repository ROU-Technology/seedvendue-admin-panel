import { Component, OnInit } from '@angular/core';
import { navigation } from '../../constants/navigations';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  constructor() {}

  navigation = navigation;

  ngOnInit(): void {}
}
