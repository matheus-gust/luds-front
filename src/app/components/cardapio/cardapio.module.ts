import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardapioRoutingModule } from './cardapio-routing.module';
import { CategoriaCardapioModule } from './categoria-cardapio/categoria-cardapio.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaCardapioModule,
    CardapioRoutingModule,
    ToastModule
  ],
  providers: []
})
export class CardapioModule { }
