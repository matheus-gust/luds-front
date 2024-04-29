import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Compra } from '../model/compras.model';
import { CompraService } from '../service/compras-service';
import { CompraInsumo } from '../model/compras-item-cardapio.model';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { Insumo } from 'src/app/components/cadastros/insumos/model/insumo.model';
import { FornecedorService } from 'src/app/components/cadastros/fornecedores/service/fornecedor-service';
import { Fornecedor } from 'src/app/components/cadastros/fornecedores/model/fornecedor.model';
import { InsumoService } from 'src/app/components/cadastros/insumos/service/insumo-service';
import { InsumoFilter } from 'src/app/components/cadastros/insumos/model/insumo-filter.model';
import { FormaPagamentoService } from 'src/app/components/cadastros/formapagamento/service/formapagamento-service';
import { FormaPagamento } from 'src/app/components/cadastros/formapagamento/model/formapagamento.model';

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
  modalFormaPagamentoVisible = false;
  modalFornecedorVisible = false;

  compras: Compra[] = [];
  compraSalvar: Compra = new Compra();

  isGlobalLoading: boolean = false;

  public colunas: any[] = [];
  public colunasDetalhes: any[] = [];
  public insumos: Insumo[] = [];

  public fornecedores: Fornecedor[] = [];
  public formaPagamentos: FormaPagamento[] = [];

  @ViewChild('fCompra', { static: false }) formularioCompra: NgForm;

  constructor(
    private compraService: CompraService,
    private fornecedorService: FornecedorService,
    private formaPagamentoService: FormaPagamentoService,
    private insumosService: InsumoService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Compras' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarCompras();

    this.colunas = [
      { field: 'data', header: 'Data', class: 'data' },
      { field: 'fornecedor.nome', header: 'Fornecedor', class: 'fornecedor' },
      { field: 'formaPagamento.nome', header: 'Forma Pagamento', class: 'formaPagamento' },
      { field: 'valorTotal', header: 'Valor', class: 'valor', prefix: 'R$' }
    ];
  }

  salvarCompra() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioCompra, 'formAdicionarCompra')) {
      return;
    }

    if (this.compraSalvar.id) {
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

  listarFormaPagamentos() {
    this.isGlobalLoading = true;
    this.formaPagamentoService.listarFormaPagamentos().subscribe(
      {
        next: (response: ApiCollectionResponse<FormaPagamento>) => {
          this.formaPagamentos = response.items;
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra inserido com sucesso' });
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra alterado com sucesso' });
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra removido com sucesso' });
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
    this.compraSalvar = { ...compra };
    const itens: CompraInsumo[] = [];
    compra.itens.forEach(item => {this.calculaTotalItem(item); itens.push({ ...item })});
    this.compraSalvar.itens = itens;
    this.atualizaDropdowns();
  }

  abreModalExclusao(compra: Compra) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a compra?',
      accept: () => {
        this.removerCompra(compra.id!)
      }
    });
  }

  public adicionarItem() {
    this.compraSalvar.itens.push(new CompraInsumo());
  }

  public removerItem(index: number) {
    this.compraSalvar.itens.splice(index!, 1);
    this.calculaValorTotal(this.compraSalvar);
  }

  public calculaValorTotal(compra: Compra) {
    let valorTotal: number = 0;
    compra.itens.forEach(item => {
      if(item.valor && item.quantidade) {
        valorTotal = valorTotal + (Number(item.valor) * Number(item.quantidade));
        if(item.desconto) {
          valorTotal = valorTotal - Number(item.desconto);
        }
      }
    });
    compra.valorTotal = this.round(valorTotal);
  }

  abreModalExclusaoitem(index: number) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover o item?',
      accept: () => {
        this.removerItem(index)
      }
    });
  }

  public selecionaInsumo(insumo: Insumo, index: number) {
    this.compraSalvar.itens[index].insumo = { ...insumo };
  }

  public defineItemFormulario(insumo: CompraInsumo) {
    const item = { ...insumo.insumo };
    return this.insumos.filter(it => item?.id === it?.id)[0];
  }

  public listarFornecedores() {
    this.fornecedorService.listarFornecedores().subscribe(
      (response) => {
        this.fornecedores = response.items;
      }
    )
  }

  public listarInsumos() {
    this.insumosService.listarInsumos().subscribe(
      (response) => {
        this.insumos = response.items;
      }
    )
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

  atualizaDropdowns() {
    this.listarFornecedores();
    this.listarInsumos();
  }

  limpaInsumos() {
    this.compraSalvar.itens = []
  }

  calculaTotalItem(item: CompraInsumo) {
    let valor = 0;
    if((item.valor && item.quantidade)) {
      valor = (item.valor * item.quantidade);
      if(item.desconto) {
        valor = valor - Number(item.desconto);
      }
    }
    item.valorTotalItem = this.round(valor);
    return item.valorTotalItem;
  }

  public calculaValorUnitario(item: CompraInsumo, compra: Compra) {
    let valorUnitario: number = 0;
    if (item.quantidade) {
      valorUnitario = item.valorTotalItem / Number(item.quantidade);
    }
    item.valor = this.round(valorUnitario);
  }

  editaValorTotalItem(compraSalvar: Compra, item: CompraInsumo) {
    item.desconto = 0;
    this.calculaValorUnitario(item, compraSalvar); 
    this.calculaValorTotal(compraSalvar)
    this.calculaTotalItem(item);
  }

  round(numero: number) {
    return Number((Math.round(numero * 100) / 100).toFixed(2))
  }

  abreModalFornecedor() {
    this.modalFornecedorVisible = true
  }

  abreModalFormaPagamento() {
    this.modalFormaPagamentoVisible = true
  }
}
