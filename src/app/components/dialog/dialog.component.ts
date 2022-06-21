import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceivedCategory } from 'src/app/shared/category.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceivedCategory | any
  ) {}

  categoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    id: new FormControl<string>('', [Validators.nullValidator]),
    description: new FormControl<string>('', [Validators.nullValidator]),
  });

  subCategoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    id: new FormControl<string>('', [Validators.nullValidator]),
    description: new FormControl<string>('', [Validators.nullValidator]),
    categoryId: new FormControl<string>('', [Validators.nullValidator]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  editCategory() {
    this.categoryForm.patchValue({
      id: this.data.data.id,
    });
    return this.categoryForm.value;
  }

  editSubCategory() {
    this.subCategoryForm.patchValue({
      id: this.data.data.id,
      categoryId: this.data.data.categoryId,
    });
    return this.subCategoryForm.value;
  }
}
