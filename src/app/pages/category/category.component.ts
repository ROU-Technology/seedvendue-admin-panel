import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { CategoryService } from 'src/app/service';
import { ReceivedCategory } from 'src/app/shared/category.interface';

interface DialogData {
  name: string;
  animal: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories: ReceivedCategory[] = [];
  isEmpty: boolean = true;

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  observer = {
    next: (res: any) => {
      this.categories.push(res);
      this.isEmpty = false;
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => console.log('Observer got a complete notification'),
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          name: 'Category 1',
          description: 'Description 1',
          status: true,
          cover: '../../../assets/image/automobile.svg',
          id: 'werwer',
          createdAt: '',
          updatedAt: '',
          SubCategory: [],
        });
      }, 2000);
      setTimeout(() => {
        observer.next({
          name: 'Category 2',
          description: 'Description 2',
          status: true,
          cover: '../../../assets/image/automobile.svg',
          id: 'werwer',
          createdAt: '',
          updatedAt: '',
          SubCategory: [],
        });
      }, 4000);
      setTimeout(() => {
        observer.next({
          name: 'Category 3',
          description: 'Description 3',
          status: true,
          cover: '../../../assets/image/automobile.svg',
          id: 'werwer',
          createdAt: '',
          updatedAt: '',
          SubCategory: [],
        });
      }, 6000);
    }).subscribe(this.observer);
  }

  toggleStatus(categoryId: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: 'rrr', animal: 'rrr' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openDialog(): void {}

  editCategory(id: string) {}
}

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>Hi {{ data.name }}</h1>
    <div mat-dialog-content>
      <p>Do you want to disable the category</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>
        Yes
      </button>
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
