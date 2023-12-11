import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { VariedadeCardapioModule } from './variedade-cardapio/variedade-cardapio.module';
import { ItemCardapioModule } from './item-cardapio/item-cardapio.module';
import { CategoriaCardapioModule } from './categoria-cardapio/categoria-cardapio.module';
import { AdicionalCardapioModule } from './adicional-cardapio/adicional-cardapio.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VariedadeCardapioModule,
    CategoriaCardapioModule,
    AdicionalCardapioModule,
    CardapioRoutingModule,
    ItemCardapioModule,
    ToastModule
  ],
  providers: []
})
export class CardapioModule { }
