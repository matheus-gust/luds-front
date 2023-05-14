import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { CategoriaCardapioModule } from './categoria-cardapio/categoria-cardapio.module';
import { ItemCardapioModule } from './item-cardapio/item-cardapio.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaCardapioModule,
    CardapioRoutingModule,
    ItemCardapioModule,
    ToastModule
  ],
  providers: []
})
export class CardapioModule { }
