import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { ActionComponent } from './action/action.component';
import { StatusComponent } from './status/status.component';


@NgModule({
  declarations: [DisplayComponent, ActionComponent, StatusComponent],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class ViewModule { }
