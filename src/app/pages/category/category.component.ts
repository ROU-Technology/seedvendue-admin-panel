import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { CategoryService } from 'src/app/service';
import { ReceivedCategory } from 'src/app/shared/category.interface';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

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
    public dialog: MatDialog
  ) {}

  observer = {
    next: (res: any) => {
      this.categories = res;
      this.isEmpty = false;
    },
    error: (err: any) => {
      console.log(err);
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
    });
  }

  openDialog(): void {}

  editCategory(categoryId: string) {
    const _data = this.categories.filter((category) => {
      return category.id === categoryId;
    });
    // console.log(_data);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { data: _data[0], type: 'edit', level: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      console.log(result);
    });
  }
}
