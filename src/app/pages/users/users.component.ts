import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { UsersService } from 'src/app/service';
import { ReceivedUsers } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users!: ReceivedUsers[];
  isEmpty: boolean = true;

  constructor(public dialog: MatDialog, private service: UsersService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.service.getAllUsers('first', false).subscribe((res) => {
      this.users = res;
      this.isEmpty = false;
    });
  }

  deleteUser(id: string): void {
    const _data = this.users.filter((user) => {
      return user.id === id;
    });
    // console.log(_data);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { data: _data[0], type: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(result);

      this.service.deleteUserById(result).subscribe((res) => {
        this.users = this.users.filter((arr) => {
          return arr.id !== result;
        });
        if (this.users.length === 0) {
          this.isEmpty = true;
        }
      });
    });
  }
}
