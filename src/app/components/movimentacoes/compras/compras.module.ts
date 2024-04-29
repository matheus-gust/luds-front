import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { ComprasComponent } from './compras/compras.component';
import { CalendarModule } from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { FornecedoresModule } from '../../cadastros/fornecedores/fornecedor.module';
import { FormaPagamentoModule } from '../../cadastros/formapagamento/formapagamento.module';

@NgModule({
  declarations: [
    ComprasComponent
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
    DialogModule,
    FornecedoresModule,
    FormaPagamentoModule
  ]
})
export class ComprasModule { }
