import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService, CategoryService } from 'src/app/service';
import {
  CreateCategory,
  ReceivedCategory,
} from 'src/app/shared/category.interface';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Router } from '@angular/router';
import { back, next } from 'src/app/constants/backend';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories!: ReceivedCategory[];
  isEmpty: boolean = true;
  // filteredCat!: ReceivedCategory[];
  initialCat!: ReceivedCategory[];
  fullCat!: ReceivedCategory[];
  isFirst: boolean = true;
  isLast: boolean = false;

  search!: string;
  next: string = next;
  back: string = back;

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  observer = {
    next: (res: any) => {
      if (res.length > 0) {
        this.categories = res;
        this.initialCat = res;
        this.fullCat = res;
        this.isEmpty = false;
        this.isFirst = true;
        this.isLast = false;
      }
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
    this.categoryService.getCategories('first', false).subscribe(this.observer);
  }

  // getCategory(type: string) {
  //   let cursorId!: string;

  //   if (type === next) {
  //     cursorId = this.initialCat[this.initialCat.length - 1].id;
  //   } else {
  //     cursorId = this.initialCat[0].id;
  //   }

  //   this.categoryService.getCategories(type, cursorId).subscribe((res) => {
  //     if (res.length > 0) {
  //       this.categories = res;
  //       this.initialCat = res;
  //       // this.fullCat.push(...res);

  //       res.forEach((ress) => {
  //         let put = this.fullCat.find((cat) => {
  //           return cat.id === ress.id;
  //         });

  //         if (!put) {
  //           this.fullCat.push(ress);
  //         }
  //       });

  //       console.log(res);
  //       this.isFirst = false;

  //       if (res.length < 10) {
  //         this.isLast = true;
  //       } else {
  //         this.isLast = false;
  //       }

  //       return;
  //     }
  //     this.isFirst = true;
  //     this.isLast = false;
  //     // console.log(res);
  //   });
  // }

  filter(event: any): any {
    // console.log(this.fullCat);
    // console.log(event);
    if (this.search.length > 0) {
      const filterCat = this.fullCat.filter((cat) => {
        return cat.name.includes(this.search);
      });

      if (filterCat.length === 0) {
        this.categories = [];
        return (this.isEmpty = true);
      }
      return (this.categories = filterCat);
    }

    this.isEmpty = false;
    return (this.categories = this.initialCat);

    // console.log(filterCat);
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
      // console.log(result);

      this.categoryService
        .delete(result, 'delete-category')
        .subscribe((res) => {
          // console.log(res);
          this.categories = this.categories.filter((arr) => {
            return arr.id !== result;
          });

          if (this.categories.length === 0) {
            this.isEmpty = true;
          }
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

      const newCategory: CreateCategory = {
        name: result.name,
        description: result.description,
      };
      // console.log(result);

      this.categoryService
        .create(newCategory, 'create-category')
        .subscribe((res) => {
          if (this.categories.length < 10) {
            this.categories.push(res);
          }
          this.isEmpty = false;
        });
    });
  }
}
