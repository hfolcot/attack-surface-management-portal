import { Component, inject, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from './dialog-data.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  title = input.required<string>();
  message = input.required<string>();
  confirmation = input<string>("OK");
  dialogRef = inject(MatDialogRef<DialogComponent>);
  data = inject<DialogData>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
