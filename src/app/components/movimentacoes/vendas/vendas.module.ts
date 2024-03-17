import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import { VendasComponent } from './vendas/vendas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { CalendarModule } from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DragDropModule} from 'primeng/dragdrop';

@NgModule({
  declarations: [
    VendasComponent
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
    ReactiveFormsModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputMaskModule,
    ProgressSpinnerModule,
    DropdownModule,
    TreeTableModule,
    CalendarModule,
    CardModule,
    DragDropModule
  ]
})
export class VendasModule { }
