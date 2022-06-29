import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CategoryService, AuthService } from 'src/app/service';
import {
  ReceivedSubCategory,
  CreateCategory,
  CreateSubCategory,
} from 'src/app/shared/category.interface';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit, AfterViewInit {
  subCategories: ReceivedSubCategory[] = [];
  isEmpty: boolean = true;
  filteredSubCat!: ReceivedSubCategory[];
  initialSubCat!: ReceivedSubCategory[];

  search!: string;

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  observer = {
    next: (res: any) => {
      if (res.length > 0) {
        this.subCategories = res;
        this.initialSubCat = res;
        this.isEmpty = false;
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
    this.categoryService
      .getSubCategories('first', false)
      .subscribe(this.observer);
  }

  filter(event: any): any {
    // console.log(this.search);
    // console.log(event);
    if (this.search.length > 0) {
      const filterCat = this.subCategories.filter((cat) => {
        return cat.name.includes(this.search);
      });

      if (filterCat.length === 0) {
        this.subCategories = [];
        return (this.isEmpty = true);
      }
      return (this.subCategories = filterCat);
    }

    this.isEmpty = false;
    return (this.subCategories = this.initialSubCat);

    // console.log(filterCat);
  }

  toggleStatus(categoryId: string) {
    // console.log(categoryId);
    const _data = this.subCategories.filter((subcategory) => {
      return subcategory.id === categoryId;
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
        .delete(result, 'delete-subcategory')
        .subscribe((res) => {
          // console.log(res);
          this.subCategories = this.subCategories.filter((arr) => {
            return arr.id !== result;
          });

          if (this.subCategories.length === 0) {
            this.isEmpty = true;
          }
        });
    });
  }

  editSubCategory(categoryId: string) {
    const _data = this.subCategories.filter((category) => {
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
      const newData = this.subCategories.map((arr) => {
        if (arr.id === result.id) {
          arr.name = result.name;
          arr.description = result.description;
        }

        return arr;
      });

      console.log(newData);
    });
  }

  createSubCategory() {
    let cat!: any[];

    this.categoryService.getCategories('first', false).subscribe((res) => {
      cat = res;
      console.log(res);

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '350px',
        data: {
          data: { categories: cat },
          type: 'create',
          level: 'subCategory',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        // console.log('The dialog was closed');

        const newSubCategory: CreateSubCategory = {
          name: result.name,
          description: result.description,
          categoryId: result.categoryId.id,
        };
        console.log(newSubCategory);

        this.categoryService
          .create(newSubCategory, 'create-subcategory')
          .subscribe((res: any) => {
            this.subCategories.push(res);
            this.isEmpty = false;
          });
      });
    });
  }
}
