import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitacaoInsumoComponent } from './solicitacao-insumo/solicitacao-insumo.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { GenericLoadingModule } from 'src/app/commons/modules/generic-loading/generic-loading.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [SolicitacaoInsumoComponent],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule,
    PanelModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    HttpClientModule,
    GenericLoadingModule,
    ConfirmDialogModule,
    InputNumberModule,
    DropdownModule,
    ProgressSpinnerModule
  ]
})
export class SolicitacaoInsumoModule { }
