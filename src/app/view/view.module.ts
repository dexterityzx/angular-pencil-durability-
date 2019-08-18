import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { ActionComponent } from './action/action.component';
import { StatusComponent } from './status/status.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [DisplayComponent, ActionComponent, StatusComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [DisplayComponent, ActionComponent, StatusComponent]
})
export class ViewModule { }
