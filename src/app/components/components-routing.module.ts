import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/components/unidades', pathMatch: 'full'},
    { path: 'components', redirectTo: '/components/unidades', pathMatch: 'full'},
    { path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)},
    { path: 'movimentacoes', loadChildren: () => import('./movimentacoes/movimentacoes.module').then(m => m.MovimentacoesModule)}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }