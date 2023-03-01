import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeModule } from './unidade/unidade.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    CadastrosRoutingModule
  ]
})
export class CadastrosModule { }
