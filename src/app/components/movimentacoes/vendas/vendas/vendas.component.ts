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
import { Parte } from '../model/partes.model';

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

  vendas: Venda[] = [];
  vendaSalvar: Venda = new Venda();

  partes: Parte[] = [];
  parteGeral: Parte = new Parte();

  novoItem: VendaItemCardapio = new VendaItemCardapio();

  isGlobalLoading: boolean = false;
  modalAdicionarItemVisible: boolean;

  public colunas: any[] = [];
  public colunasItens: any[] = [];
  public colunasPartes: any[] = [];

  public varsSelecioandas: any[] = [];

  @ViewChild('fVenda', { static: false }) formularioVenda: NgForm;
  @ViewChild('fItem', { static: false }) formularioItem: NgForm;

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
      { field: 'valor', header: 'Valor', class: 'valor', prefix: 'R$' }
    ];
    this.colunasPartes = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'valor', header: 'Valor', class: 'valor' }
    ];
    this.colunasItens = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'valor', header: 'Valor', class: 'valor' },
      { field: 'quantidade', header: 'Quantidade', class: 'quantidade' }
    ];
  }

  public salvarVenda() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioVenda, 'formAdicionarVenda')) {
      return;
    }

    this.parteGeral.nome = 'Geral';
    this.vendaSalvar.partes = this.partes;
    this.vendaSalvar.partes.push(this.parteGeral);

    if (this.vendaSalvar.id) {
      this.alterarVenda();
    } else {
      this.inserirVenda();
    }
  }

  public listarItens() {
    this.itemService.listarItensCardapioInfo().subscribe(
      {
        next: (response: ApiCollectionResponse<ItemCardapioInfoDTO>) => {
          this.itensCardapio = response.items;
        }, error: () => {
        }
      }
    )
  }

  public listarVendas() {
    this.isGlobalLoading = true;
    this.vendas = [];
    this.vendaService.listarVendas().subscribe(
      {
        next: (response: ApiCollectionResponse<Venda>) => {
          response.items.forEach(venda => {
            this.vendas.push(venda);
          });
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  public buscarVenda(idVenda: string) {
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

  public inserirVenda() {
    this.isGlobalLoading = true;
    console.log(this.vendaSalvar)
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

  public alterarVenda() {
    console.log('alterar')
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

  public abreModalExclusaoitem(nomeParte: string, index: number) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover o item?',
      accept: () => {
        this.removerItem(nomeParte, index)
      }
    });
  }

  
  public abreModalExclusaoParte(nomeParte: string, index: number) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a parte?',
      accept: () => {
        this.removerParte(nomeParte, index)
      }
    });
  }

  public removerVenda(idVenda: string) {
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

  public abreSlideInserir() {
    this.displaySaveBar = true;
    this.vendaSalvar = new Venda();
    this.partes = [];
    this.parteGeral = new Parte();
  }

  public abreSlideEditar(venda: Venda) {
    this.partes = [];
    venda.partes.forEach(part => {
      if(part.nome != 'Geral') {
        this.partes.push({...part});
      } else {
        this.parteGeral = { ...part };
      }
    });
    this.vendaSalvar = { ...venda };
    
    this.displaySaveBar = true;
  }

  public abreModalExclusao(venda: Venda) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a venda?',
      accept: () => {
        this.removerVenda(venda.id!)
      }
    });
  }

  public adicionarItem(nomeParte: string) {

    if (!this.formValidService.validaFormularioInsercao(this.formularioItem, 'formAdicionarVenda')) {
      return;
    }

    if(nomeParte === 'Geral') {
      this.parteGeral.itens.push({...this.novoItem});
    } else {
      const parte = this.partes.find(part => part.nome === nomeParte);
      if(parte) {
        parte.itens.push({...this.novoItem});
      }
    }
    this.calculaValorParte(nomeParte);
    this.calculaValorTotal(this.vendaSalvar);
    this.novoItem = new VendaItemCardapio();
    this.modalAdicionarItemVisible = false;
  }

  public removerItem(nomeParte: string, index: number) {
    if(nomeParte == "Geral") {
      this.parteGeral.itens.splice(index!, 1);
    } else {
      const parte = this.partes.find(part => part.nome === nomeParte);
      parte?.itens.splice(index!, 1);
    }
    this.calculaValorParte(nomeParte);
    this.calculaValorTotal(this.vendaSalvar);
  }

  public adicionarParte() {
    const parte = new Parte();
    parte.nome = String(this.partes.length + 1);
    this.partes.push(parte);
  }

  public removerParte(nomeParte: string, index: number) {
    this.partes.splice(index!, 1);
    this.calculaValorTotal(this.vendaSalvar);
  }

  public removerItemDaParte(indexItemNaParte: number, indexParte: number) {
    this.partes[indexParte].itens.splice(indexItemNaParte!, 1);
  }

  public calculaValorItem(item: VendaItemCardapio) {
    if (item.variedade.valor && item.quantidade) {
      let valor = item.variedade.valor * item.quantidade;
      item.valor = valor;
    } else {
      item.valor = 0;
    }
  }

  public calculaValorParte(nomeParte: string) {
    let valorTotal = 0;
    if(nomeParte === 'Geral') {
      this.parteGeral.itens.forEach(item => {
        valorTotal += Number(item.valor);
      });
      this.parteGeral.valorParte = valorTotal
    } else {
      const parte = this.partes.find(part => part.nome === nomeParte);
      if(parte) {
        parte.itens.forEach(item => {
          valorTotal += Number(item.valor);
        });
        parte.valorParte = valorTotal;
      }
    }
  }

  public calculaValorTotal(venda: Venda) {
    let valorTotal = 0;
    this.parteGeral.itens.forEach(item => {
      valorTotal += Number(item.valor);
    });
    this.partes.forEach(parte => parte.itens.forEach(item => {
      valorTotal += Number(item.valor);
    }));
    venda.valor = valorTotal;
  }

  public formatarData(data: Date): string {
    return formatDate(data, 'dd/MM/yyyy', 'pt');
  }

  public defineItemFormulario(venda: VendaItemCardapio) {
    const item = { ...venda.item };
    return this.itensCardapio.filter(it => item?.id === it?.id)[0];
  }
  public defineVariedadeFormulario(dropDown: Dropdown, variedade: ItemCardapioVariedade, index: number) {
    //this.vendaSalvar.itens[index].variedade = { ...variedade };
    return dropDown.selectedOption = { ...variedade };
  }

  public defineOpcoes(item: ItemCardapio) {
    const itemCardapio = this.itensCardapio.filter(it => item?.id === it?.id)[0];
    if(itemCardapio) {
      return [...itemCardapio.variedades];
    }
    return [];
  }

  public parteLabel(option: any): string {
    return option.nome;
  }

  public abrirModalAdicionarItem(nomeParte: string) {
    this.modalAdicionarItemVisible = true;
    this.novoItem = new VendaItemCardapio();
    this.novoItem.parte = nomeParte;
  }

  getFieldValue(rowData: any, field: string): any {
    const fields = field.split('.');
    let value = rowData;
    for (const f of fields) {
      value = value[f];
      if (value === undefined || value === null) {
        return null;
      }
    }
    return value;
  }
  
}
