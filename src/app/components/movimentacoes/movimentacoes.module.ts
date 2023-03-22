import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacoesRoutingModule } from './movimentacoes-routing.module';
import { SolicitacaoInsumoComponent } from './solicitacao-insumo/solicitacao-insumo/solicitacao-insumo.component';
import { SolicitacaoInsumoModule } from './solicitacao-insumo/solicitacao-insumo.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SolicitacaoInsumoModule,
    MovimentacoesRoutingModule
  ]
})
export class MovimentacoesModule { }
