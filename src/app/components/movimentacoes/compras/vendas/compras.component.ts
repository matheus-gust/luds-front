import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Compra } from '../model/compras.model';
import { CompraService } from '../service/compras-service';
import { VariedadeCardapio } from 'src/app/components/cardapio/variedade-cardapio/model/variedade-cardapio.model';
import { CategoriaCardapio } from 'src/app/components/cardapio/categoria-cardapio/model/categoria-cardapio.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  compras: Compra[] = [
    {data: '22/08/2000', id: '123', itens: [], origem: 'Ifood', valor: 20.00},
  ];
  compraSalvar: Compra = new Compra();

  isGlobalLoading: boolean = false;

  public colunas: any[] = [];
  public colunasDetalhes: any[] = [];

  constructor(    
    private compraService: CompraService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Compras' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //this.listarCompras();

    this.colunas = [
      { field: 'data', header: 'Data', class: 'data' },
      { field: 'origem', header: 'Origem', class: 'origem' },
      { field: 'valor', header: 'Valor', class: 'valor' }
    ];
    this.colunasDetalhes = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'valor', header: 'Valor', class: 'valor' },
      { field: 'quantidade', header: 'Quantidade', class: 'Quantidade' }
    ];
  }

  salvarCompra() {
    if(this.compraSalvar.id) {
      this.alterarCompra();
    } else {
      this.inserirCompra();
    }
  }

  listarCompras() {
    this.isGlobalLoading = true;
    this.compraService.listarCompras().subscribe(
      {
        next: (response: ApiCollectionResponse<Compra>) => {
          this.compras = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarCompra(idCompra: string) {
    this.isGlobalLoading = true;
    this.compraService.buscarCompraPorId(idCompra).subscribe(
      {
        next: (response: Compra) => {
          this.isGlobalLoading = false;
          this.compraSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirCompra() {
    this.isGlobalLoading = true;
    this.compraService.inserirCompra(this.compraSalvar).subscribe(
      {
        next: (response: Compra) => {
          this.listarCompras();
          this.isGlobalLoading = false;
          this.compraSalvar = new Compra();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Compra inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarCompra() {
    this.compraService.alterarCompra(this.compraSalvar).subscribe(
      {
        next: (response: Compra) => {
          this.listarCompras();
          this.compraSalvar = new Compra();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Compra alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerCompra(idCompra: string) {
    this.isGlobalLoading = true;
    this.compraService.removerCompra(idCompra).subscribe(
      {
        next: () => {
          this.listarCompras();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Compra removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.compraSalvar = new Compra();
  }

  abreSlideEditar(compra: Compra) {
    this.displaySaveBar = true; 
    this.compraSalvar = {...compra}
  }

  abreModalExclusao(compra: Compra) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a compra?',
      accept: () => {
          this.removerCompra(compra.id!)
      }
  });
  }

}
