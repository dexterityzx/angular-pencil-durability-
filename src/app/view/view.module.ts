import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { ActionComponent } from './action/action.component';
import { MAT_IMPORT } from './ng-material.import';

@NgModule({
  declarations: [DisplayComponent, ActionComponent],
  imports: [
    CommonModule,
    ...MAT_IMPORT
  ],
  exports: [DisplayComponent, ActionComponent]
})
export class ViewModule { }
