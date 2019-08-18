import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { ActionComponent } from './action/action.component';
import { StatusComponent } from './status/status.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_IMPORT } from './ng-material.import';
@NgModule({
  declarations: [DisplayComponent, ActionComponent, StatusComponent],
  imports: [
    CommonModule,
    ...MAT_IMPORT
  ],
  exports: [DisplayComponent, ActionComponent, StatusComponent]
})
export class ViewModule { }
