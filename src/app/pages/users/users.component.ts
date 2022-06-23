import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users!: any[];
  isEmpty: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  deleteUser(id: string): void {
    console.log(id);
  }
}
