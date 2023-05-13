import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCardapioComponent } from './categoria-cardapio/categoria-cardapio/categoria-cardapio.component';

const routes: Routes = [
  { path: 'categoria-cardapio', component: CategoriaCardapioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapioRoutingModule { }