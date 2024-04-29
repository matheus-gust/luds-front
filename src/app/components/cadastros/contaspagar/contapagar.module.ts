import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ContaPagarsComponent } from './contapagar/contapagar.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ContaPagarsComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    CalendarModule,
    InputNumberModule,
    InputMaskModule,
    ProgressSpinnerModule,
    DropdownModule,
    DialogModule
  ]
})
export class ContaPagarModule { }
