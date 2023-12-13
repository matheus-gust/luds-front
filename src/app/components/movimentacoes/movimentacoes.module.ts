import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacoesRoutingModule } from './movimentacoes-routing.module';
import { SolicitacaoInsumoModule } from './solicitacao-insumo/solicitacao-insumo.module';
import { VendasModule } from './vendas/vendas.module';
import { ComprasModule } from './compras/compras.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SolicitacaoInsumoModule,
    VendasModule,
    ComprasModule,
    MovimentacoesRoutingModule
  ]
})
export class MovimentacoesModule { }
