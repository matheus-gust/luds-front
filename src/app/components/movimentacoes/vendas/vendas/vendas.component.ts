import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Venda } from '../model/vendas.model';
import { VendaService } from '../service/vendas-service';
import { VariedadeCardapio } from 'src/app/components/cardapio/variedade-cardapio/model/variedade-cardapio.model';
import { VendaItemCardapio } from '../model/venda-item-cardapio.model';
import { ItemCardapio } from 'src/app/components/cardapio/item-cardapio/model/item-cardapio.model';
import { ItemCardapioService } from 'src/app/components/cardapio/item-cardapio/service/item-cardapio.service';
import { ItemCardapioInfoDTO } from 'src/app/components/cardapio/item-cardapio/model/item-cardapio-info-dto.model';
import { ItemCardapioVariedade } from 'src/app/components/cardapio/item-cardapio/model/item-cardapio-variedade.model';
import { Dropdown } from 'primeng/dropdown';
import { formatDate } from '@angular/common';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { NgForm } from '@angular/forms';

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
    { id: '', label: '' },
    { id: 'ifood', label: 'Ifood' },
    { id: 'salao', label: 'Salão' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'retirada', label: 'Retirada' }
  ];
  origem: any = new Object();

  itensCardapio: ItemCardapioInfoDTO[] = [];
  variedades: ItemCardapioVariedade[] = [];

  variedadeCardapio: VariedadeCardapio = new VariedadeCardapio();

  displaySaveBar: boolean = false;

  vendas: Venda[] = [
  ];
  vendaSalvar: Venda = new Venda();

  isGlobalLoading: boolean = false;

  public colunas: any[] = [];
  public colunasDetalhes: any[] = [];

  public varsSelecioandas: any[] = [];

  @ViewChild('fVenda', { static: false }) formularioVenda: NgForm;

  constructor(
    private vendaService: VendaService,
    private itemService: ItemCardapioService,
    private formValidService: FormValidService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Vendas' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarVendas();
    this.listarItens();

    this.colunas = [
      { field: 'data', header: 'Data', class: 'data', type: 'date' },
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
  console.log(this.formularioVenda)
  if (!this.formValidService.validaFormularioInsercao(this.formularioVenda, 'formAdicionarVenda')) {
    return;
  }

  if (this.vendaSalvar.id) {
    this.alterarVenda();
  } else {
    this.inserirVenda();
  }
}

listarItens() {
  this.itemService.listarItensCardapioInfo().subscribe(
    {
      next: (response: ApiCollectionResponse<ItemCardapioInfoDTO>) => {
        this.itensCardapio = [new ItemCardapioInfoDTO()].concat(response.items);
      }, error: () => {
      }
    }
  )
}

listarVendas() {
  this.isGlobalLoading = true;
  this.vendas = [];
  this.vendaService.listarVendas().subscribe(
    {
      next: (response: ApiCollectionResponse<Venda>) => {
        response.items.forEach(venda => {
          venda.itens.map(venda => venda.item = venda.variedade.item)
          this.vendas.push(venda);
        });
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
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda inserido com sucesso' });
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
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda alterado com sucesso' });
      }, error: () => {
        this.isGlobalLoading = false;
      }
    }
  )
}

  public removerItem(index: number) {
  this.vendaSalvar.itens.splice(index!, 1);
  this.calculaValorTotal(this.vendaSalvar);
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
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda removido com sucesso' });
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
  this.vendaSalvar = { ...venda };
  const itens: VendaItemCardapio[] = [];
  venda.itens.forEach(item => itens.push({ ...item }));
  this.vendaSalvar.itens = itens;
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

  public selecionaItem(item: ItemCardapio, index: number) {
  this.vendaSalvar.itens[index].item = { ...item };
  this.vendaSalvar.itens[index].variedade = new ItemCardapioVariedade();
}
  public calculaValor(item: VendaItemCardapio) {
  if (item.variedade.valor && item.quantidade) {
    let valor = item.variedade.valor * item.quantidade;
    item.valor = valor;
  } else {
    item.valor = 0;
  }
  this.calculaValorTotal(this.vendaSalvar);
}

  public calculaValorTotal(venda: Venda) {
  let valorTotal = 0;
  venda.itens.forEach(item => valorTotal += item.valor);
  venda.valor = valorTotal;
}

formatarData(data: Date): string {
  return formatDate(data, 'dd/MM/yyyy', 'pt');
}

  public defineItemFormulario(venda: VendaItemCardapio) {
  const item = { ...venda.item };
  return this.itensCardapio.filter(it => item?.id === it?.id)[0];
}
  public defineVariedadeFormulario(dropDown: Dropdown, variedade: ItemCardapioVariedade, index: number) {
  this.vendaSalvar.itens[index].variedade = { ...variedade };
  return dropDown.selectedOption = { ...variedade };
}

  public defineOpcoes(item: ItemCardapio) {
  const itemCardapio = this.itensCardapio.filter(it => item?.id === it?.id)[0];
  return [new VariedadeCardapio].concat([...itemCardapio.variedades]);
}
}
