import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeModule } from './unidade/unidade.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { InsumosModule } from './insumos/insumos.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FornecedoresModule } from './fornecedores/fornecedor.module';
import { UnidadeMedidaModule } from './unidademedida/unidademedida.module';
import { CategoriasModule } from './categoria/categoria.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    UnidadeMedidaModule,
    CategoriasModule,
    FornecedoresModule,
    InsumosModule,
    CadastrosRoutingModule,
    ProgressSpinnerModule
  ]
})
export class CadastrosModule { }
