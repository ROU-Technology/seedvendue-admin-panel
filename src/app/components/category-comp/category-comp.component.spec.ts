import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCompComponent } from './category-comp.component';

describe('CategoryCompComponent', () => {
  let component: CategoryCompComponent;
  let fixture: ComponentFixture<CategoryCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
