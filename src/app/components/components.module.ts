import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosModule } from './cadastros/cadastros.module';
import { ComponentsRoutingModule } from './components-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastrosModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
