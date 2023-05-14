import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCardapioComponent } from './categoria-cardapio/categoria-cardapio/categoria-cardapio.component';
import { ItemCardapioComponent } from './item-cardapio/item-cardapio/item-cardapio.component';

const routes: Routes = [
  { path: 'categoria-cardapio', component: CategoriaCardapioComponent},
  { path: 'item-cardapio', component: ItemCardapioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapioRoutingModule { }