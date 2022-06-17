import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReceivedCategory } from '../shared/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<any[]> {
    return of([
      {
        name: 'Category 1',
        description: 'Description 1',
        status: true,
        cover: '../../../assets/image/automobile.svg',
        id: 'werwer',
        createdAt: '',
        updatedAt: '',
        SubCategory: [],
      },
    ]);
  }
}
