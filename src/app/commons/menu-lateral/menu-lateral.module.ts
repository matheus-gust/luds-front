import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PanelMenuModule } from 'primeng/panelmenu';



@NgModule({
  declarations: [MenuLateralComponent],
  imports: [
    CommonModule,
    PanelMenuModule
  ],
  exports: [MenuLateralComponent]
})
export class MenuLateralModule { }
