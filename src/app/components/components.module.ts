import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosModule } from './cadastros/cadastros.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module';
import { ToastModule } from 'primeng/toast';
import { CardapioModule } from './cardapio/cardapio.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastrosModule,
    MovimentacoesModule,
    CardapioModule,
    ComponentsRoutingModule,
    ToastModule
  ],
  providers: []
})
export class ComponentsModule { }
