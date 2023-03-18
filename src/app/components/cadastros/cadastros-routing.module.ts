import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsumosComponent } from './insumos/insumos/insumos.component';
import { UnidadeComponent } from './unidade/unidade/unidade.component';

const routes: Routes = [
  { path: 'unidades', component: UnidadeComponent},
  { path: 'insumos', component: InsumosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule { }