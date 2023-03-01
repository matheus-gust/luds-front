import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadeComponent } from './unidade/unidade/unidade.component';

const routes: Routes = [
  { path: 'unidades', component: UnidadeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule { }