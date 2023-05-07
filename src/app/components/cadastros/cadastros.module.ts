import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeModule } from './unidade/unidade.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { InsumosModule } from './insumos/insumos.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    InsumosModule,
    CadastrosRoutingModule,
    ProgressSpinnerModule
  ]
})
export class CadastrosModule { }
