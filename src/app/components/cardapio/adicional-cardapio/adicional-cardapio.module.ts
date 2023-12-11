import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionalCardapioComponent } from './adicional-cardapio/adicional-cardapio.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { GenericLoadingModule } from 'src/app/commons/modules/generic-loading/generic-loading.module';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    AdicionalCardapioComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    SidebarModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    HttpClientModule,
    GenericLoadingModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class AdicionalCardapioModule { }
