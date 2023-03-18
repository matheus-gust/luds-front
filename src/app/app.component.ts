import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'luds-front';

  public items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        expanded: true,
        label: 'Cadastros',
        items: [
          { label: 'Unidades', icon: 'pi pi-building', routerLink: ['/components/unidades'] },
          { label: 'Insumos', icon: 'pi pi-download', routerLink: ['/components/insumos'] }
        ]
      },
      {
        expanded: true,
        label: 'Movimentos',
        items: [
          { label: 'Solicitação de Insumo', icon: 'pi pi-cart-plus' }
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
}
