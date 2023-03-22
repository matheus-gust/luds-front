import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoInsumoComponent } from './solicitacao-insumo/solicitacao-insumo/solicitacao-insumo.component';

const routes: Routes = [
  { path: 'solicitacao-insumo', component: SolicitacaoInsumoComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentacoesRoutingModule { }