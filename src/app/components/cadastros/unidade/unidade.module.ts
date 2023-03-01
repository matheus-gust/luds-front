import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeComponent } from './unidade/unidade.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [UnidadeComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    InputTextModule
  ]
})
export class UnidadeModule { }
