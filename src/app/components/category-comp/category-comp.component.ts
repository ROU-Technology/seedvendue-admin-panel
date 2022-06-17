import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-category-comp',
  templateUrl: './category-comp.component.html',
  styleUrls: ['./category-comp.component.scss'],
})
export class CategoryCompComponent implements OnInit, AfterViewInit {
  @Input() Data!: PeriodicElement[];
  @Input() tableTitle!: string;
  @Input() tableColumns!: any[];

  constructor() {}

  dataSource!: MatTableDataSource<PeriodicElement>;
  displayedColumns!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // console.log(this.Data);
    this.dataSource = new MatTableDataSource(this.Data);
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
