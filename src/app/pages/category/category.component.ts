import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AuthService, CategoryService } from 'src/app/service';
import { ReceivedCategory } from 'src/app/shared/category.interface';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories!: ReceivedCategory[];
  isEmpty: boolean = true;

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  observer = {
    next: (res: any) => {
      this.categories = res;
      this.isEmpty = false;
    },
    error: (err: any) => {
      // console.log(err);
      if (err.statusCode === 401) {
        alert('Unauthorized, please login again');
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    },
    complete: () => console.log('Observer got a complete notification'),
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.categoryService.getCategories().subscribe(this.observer);
  }

  toggleStatus(categoryId: string) {
    // console.log(categoryId);
    const _data = this.categories.filter((category) => {
      return category.id === categoryId;
    });
    // console.log(_data);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { data: _data[0], type: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      console.log(result);
      this.categories = this.categories.filter((arr) => {
        return arr.id !== result;
      });
    });
  }

  editCategory(categoryId: string) {
    const _data = this.categories.filter((category) => {
      return category.id === categoryId;
    });
    // console.log(_data);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { data: _data[0], type: 'edit', level: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      console.log(result);
      const newData = this.categories.map((arr) => {
        if (arr.id === result.id) {
          arr.name = result.name;
          arr.description = result.description;
        }

        return arr;
      });

      console.log(newData);
    });
  }

  createCategory() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { data: {}, type: 'create', level: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      console.log(result);
    });
  }
}
