import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericLoadingComponent } from './generic-loading/generic-loading.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    GenericLoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [GenericLoadingComponent]
})
export class GenericLoadingModule { }
