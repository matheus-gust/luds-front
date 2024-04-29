import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsumosComponent } from './insumos/insumos/insumos.component';
import { UnidadeComponent } from './unidade/unidade/unidade.component';
import { FornecedoresComponent } from './fornecedores/fornecedores/fornecedor.component';
import { UnidadeMedidasComponent } from './unidademedida/unidademedida/unidademedida.component';
import { CategoriasComponent } from './categoria/categoria/categoria.component';
import { TipoPagamentosComponent } from './tipopagamento/tipopagamento/tipopagamento.component';
import { ContaPagarsComponent } from './contaspagar/contapagar/contapagar.component';
import { FormaPagamentosComponent } from './formapagamento/formapagamento/formapagamento.component';

const routes: Routes = [
  { path: 'unidades', component: UnidadeComponent},
  { path: 'categoria', component: CategoriasComponent},
  { path: 'unidade-medida', component: UnidadeMedidasComponent},
  { path: 'tipo-pagamento', component: TipoPagamentosComponent},
  { path: 'fornecedores', component: FornecedoresComponent},
  { path: 'insumos', component: InsumosComponent},
  { path: 'forma-pagamento', component: FormaPagamentosComponent},
  { path: 'conta-pagar', component: ContaPagarsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule { }