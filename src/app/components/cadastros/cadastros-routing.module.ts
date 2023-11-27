import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsumosComponent } from './insumos/insumos/insumos.component';
import { UnidadeComponent } from './unidade/unidade/unidade.component';
import { FornecedoresComponent } from './fornecedores/fornecedores/fornecedor.component';
import { UnidadeMedidasComponent } from './unidademedida/unidademedida/unidademedida.component';

const routes: Routes = [
  { path: 'unidades', component: UnidadeComponent},
  { path: 'unidade-medida', component: UnidadeMedidasComponent},
  { path: 'fornecedores', component: FornecedoresComponent},
  { path: 'insumos', component: InsumosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule { }