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
import { ClientesComponent } from './cliente/cliente.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    ClientesComponent
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
    InputNumberModule,
    InputMaskModule,
    ProgressSpinnerModule,
    DropdownModule,
    CalendarModule
  ]
})
export class ClienteModule { }
