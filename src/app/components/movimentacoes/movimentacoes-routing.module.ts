import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoInsumoComponent } from './solicitacao-insumo/solicitacao-insumo/solicitacao-insumo.component';
import { VendasComponent } from './vendas/vendas/vendas.component';
import { ComprasComponent } from './compras/compras/compras.component';

const routes: Routes = [
  { path: 'solicitacao-insumo', component: SolicitacaoInsumoComponent},
  { path: 'vendas', component: VendasComponent},
  { path: 'compras', component: ComprasComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentacoesRoutingModule { }