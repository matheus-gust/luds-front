import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  private estaMenuAberto: boolean = true;
  @ViewChild('menuLateral', { static: false }) menuLateral: ElementRef;
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;

  public permissoesToken: any[];

  public rotaAtiva: string;
  public nome: string;

  public items: MenuItem[] = [];

  constructor(
    private route: Router,
    public changeDetectorRef: ChangeDetectorRef
    ) {

    this.route.events.subscribe((
      (val) => {
        setTimeout(
          () => {
            this.rotaAtiva = this.route.url.split('/')[1];
          }, 1
        )
      }
    ));

    this.items = [
      {
        expanded: true,
        label: 'Cadastros',
        items: [
          { label: 'Unidades', icon: 'pi pi-building', routerLink: ['/components/unidades'], command: this.fecharMenu.bind(this) },
          { label: 'Insumos', icon: 'pi pi-download', routerLink: ['/components/insumos'], command: this.fecharMenu.bind(this) }
        ]
      },
      {
        expanded: true,
        label: 'Movimentos',
        items: [
          { label: 'Solicitação de Insumo', icon: 'pi pi-cart-plus', routerLink: ['/components/solicitacao-insumo'], command: this.fecharMenu.bind(this) }
        ]
      },
      {
        expanded: true,
        label: 'Cardapio',
        items: [
          { label: 'Categoria', icon: 'pi pi-align-justify', routerLink: ['/components/categoria-cardapio'], command: this.fecharMenu.bind(this) }
        ]
      },
      {
        expanded: true,
        label: 'Relatórios',
        items: [
          { label: 'Solicitações', icon: 'pi pi-list' }
        ]
      }];
  }

  ngOnInit() {
    setTimeout(
      () => {
        this.rotaAtiva = this.route.url.split('/')[1];
      }, 1
    )
    setTimeout(
      () => {
        if(window.innerWidth < 799) {
          this.estaMenuAberto = true;
          this.abrirMenu();
        } 
      }, 1
    )
  }

  public abrirMenu() {
    if (!this.estaMenuAberto) {
      this.estaMenuAberto = true;
      this.menuLateral.nativeElement.style.left = '0px';
      if (window.innerWidth > 799) {
        this.conteudo.nativeElement.style.marginLeft = '330px';
      }
    } else {
      this.estaMenuAberto = false;
      if (window.innerWidth > 799) {
        this.conteudo.nativeElement.style.marginLeft = '10px';
        this.menuLateral.nativeElement.style.left = '-330px';
      } else {
        this.conteudo.nativeElement.style.marginLeft = '10px';
        this.menuLateral.nativeElement.style.left = '-' + window.innerWidth.toString() + 'px';
      }
    }
  }

  public fecharMenu() {
    if(window.innerWidth < 799) {
      this.abrirMenu();
    }
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

}