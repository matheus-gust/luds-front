import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariedadeCardapioComponent } from './variedade-cardapio/variedade-cardapio/variedade-cardapio.component';
import { ItemCardapioComponent } from './item-cardapio/item-cardapio/item-cardapio.component';
import { CategoriaCardapioComponent } from './categoria-cardapio/categoria-cardapio/categoria-cardapio.component';
import { AdicionalCardapioComponent } from './adicional-cardapio/adicional-cardapio/adicional-cardapio.component';

const routes: Routes = [
  { path: 'variedade-cardapio', component: VariedadeCardapioComponent},
  { path: 'categoria-cardapio', component: CategoriaCardapioComponent},
  { path: 'item-cardapio', component: ItemCardapioComponent},
  { path: 'adicional-cardapio', component: AdicionalCardapioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapioRoutingModule { }