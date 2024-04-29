import { Component } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'luds-front';

  public items: MenuItem[] = [];


  traducaoPath = './assets/i18n/primeng-pt.json';

  constructor(private config: PrimeNGConfig) { }

  ngOnInit() {

    this.loadJSON(this.traducaoPath)
      .then((translations) => {
        this.config.setTranslation(translations);
      })
      .catch((error) => {
        console.error('Erro ao carregar o arquivo JSON:', error);
      });

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
          { label: 'Solicitação de Insumo', icon: 'pi pi-cart-plus', routerLink: ['/components/solicitacao-insumo'] }
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

  async loadJSON(path: string): Promise<any> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load JSON file from ${path}`);
    }
    return await response.json();
  }
}
