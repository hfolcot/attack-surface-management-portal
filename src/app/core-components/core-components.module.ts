import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';

const publicComponents = [
  CardComponent, DialogComponent, HeaderComponent
]

@NgModule({
  declarations: [
    ...publicComponents
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ...publicComponents
  ]
})
export class CoreComponentsModule { }
