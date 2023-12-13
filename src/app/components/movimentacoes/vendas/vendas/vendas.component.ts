import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Venda } from '../model/vendas.model';
import { VendaService } from '../service/vendas-service';
import { VariedadeCardapio } from 'src/app/components/cardapio/variedade-cardapio/model/variedade-cardapio.model';
import { CategoriaCardapio } from 'src/app/components/cardapio/categoria-cardapio/model/categoria-cardapio.model';
import { VendaItemCardapio } from '../model/venda-item-cardapio.model';
import { ItemCardapio } from 'src/app/components/cardapio/item-cardapio/model/item-cardapio.model';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};
  origens: any[] = [
    {id: '', label: ''},
    {id: 'ifood', label: 'Ifood'},
    {id: 'salao', label: 'Salão'},
    {id: 'delivery', label: 'Delivery'},
    {id: 'retirada', label: 'Retirada'}
  ];
  origem: any;

  displaySaveBar: boolean = false;

  vendas: Venda[] = [
    {data: '22/08/2000', id: '123', itens: [
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() },
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() },
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() }
    ], origem: 'Ifood', valor: 20.00},
    {data: '22/08/2000', id: '124', itens: [
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() },
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() }
    ], origem: 'Ifood', valor: 20.00},
    {data: '22/08/2000', id: '125', itens: [
      {id: '', boletim: '', quantidade: 5, valor: 50.00, variedade: new VariedadeCardapio(), item: new ItemCardapio() }
    ], origem: 'Ifood', valor: 20.00}
  ];
  vendaSalvar: Venda = new Venda();

  isGlobalLoading: boolean = false;

  public colunas: any[] = [];
  public colunasDetalhes: any[] = [];

  constructor(    
    private vendaService: VendaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Vendas' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    //this.listarVendas();

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

  salvarVenda() {
    if(this.vendaSalvar.id) {
      this.alterarVenda();
    } else {
      this.inserirVenda();
    }
  }

  listarVendas() {
    this.isGlobalLoading = true;
    this.vendaService.listarVendas().subscribe(
      {
        next: (response: ApiCollectionResponse<Venda>) => {
          this.vendas = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarVenda(idVenda: string) {
    this.isGlobalLoading = true;
    this.vendaService.buscarVendaPorId(idVenda).subscribe(
      {
        next: (response: Venda) => {
          this.isGlobalLoading = false;
          this.vendaSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirVenda() {
    this.isGlobalLoading = true;
    this.vendaService.inserirVenda(this.vendaSalvar).subscribe(
      {
        next: (response: Venda) => {
          this.listarVendas();
          this.isGlobalLoading = false;
          this.vendaSalvar = new Venda();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Venda inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarVenda() {
    this.vendaService.alterarVenda(this.vendaSalvar).subscribe(
      {
        next: (response: Venda) => {
          this.listarVendas();
          this.vendaSalvar = new Venda();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Venda alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  public removerItem(index: number) {
    this.vendaSalvar.itens.splice(index!, 1);
  }

  abreModalExclusaoitem(index: number) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover o item?',
      accept: () => {
          this.removerItem(index)
      }
  });
  }

  removerVenda(idVenda: string) {
    this.isGlobalLoading = true;
    this.vendaService.removerVenda(idVenda).subscribe(
      {
        next: () => {
          this.listarVendas();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Venda removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.vendaSalvar = new Venda();
  }

  abreSlideEditar(venda: Venda) {
    this.displaySaveBar = true; 
    this.vendaSalvar = {...venda}
  }

  abreModalExclusao(venda: Venda) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a venda?',
      accept: () => {
          this.removerVenda(venda.id!)
      }
  });
  }

  public adicionarItem() {
    this.vendaSalvar.itens.push(new VendaItemCardapio());
  }

}
