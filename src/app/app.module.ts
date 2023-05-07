import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { GenericLoadingModule } from './commons/modules/generic-loading/generic-loading.module';
import {ToastModule} from 'primeng/toast';
import { Interceptor } from './interceptors/http-interceptor.service';
import { MessageService } from 'primeng/api';
import { MenuLateralModule } from './commons/menu-lateral/menu-lateral.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    SidebarModule,
    CommonModule,
    MenubarModule,
    MenubarModule,
    ComponentsModule,
    AppRoutingModule,
    GenericLoadingModule,
    ToastModule,
    Interceptor,
    MenuLateralModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
