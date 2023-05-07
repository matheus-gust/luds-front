import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeComponent } from './unidade/unidade.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericLoadingModule } from 'src/app/commons/modules/generic-loading/generic-loading.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [UnidadeComponent],
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
    ProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class UnidadeModule { }
