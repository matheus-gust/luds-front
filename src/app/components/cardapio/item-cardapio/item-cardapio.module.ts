import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardapioComponent } from './item-cardapio/item-cardapio.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { GenericLoadingModule } from 'src/app/commons/modules/generic-loading/generic-loading.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    ItemCardapioComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    GenericLoadingModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    TagModule,
    FieldsetModule,
    InputTextareaModule,
    DropdownModule
  ]
})
export class ItemCardapioModule { }
