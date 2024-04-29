import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { FormaPagamento } from '../model/formapagamento.model';
import { FormaPagamentoService } from '../service/formapagamento-service';
import { Fornecedor } from '../../fornecedores/model/fornecedor.model';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { TipoPagamento } from '../../tipopagamento/model/tipopagamento.model';
import { TipoPagamentoService } from '../../tipopagamento/service/tipopagamento-service';

@Component({
  selector: 'app-formaPagamentos',
  templateUrl: './formapagamento.component.html',
  styleUrls: ['./formapagamento.component.css']
})
export class FormaPagamentosComponent implements OnInit {
  @Input() hospedeiro: boolean;

  items: MenuItem[] = [];
  display: boolean = false;
  tipoPagamentoModal = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  formaPagamentos: FormaPagamento[] = [];
  formaPagamentoSalvar: FormaPagamento = new FormaPagamento();

  tipoPagamentoSelecionado: TipoPagamento;
  tiposPagamentos: TipoPagamento[] = [];

  fornecedor: Fornecedor;
  fornecedores: Fornecedor[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private tipoPagamentoService: TipoPagamentoService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Forma de Pagamentos' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarFormaPagamentos();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'tipoPagamento.nome', header: 'Tipo Pagamento', class: 'tipoPagamento' },
    ];
  }

  salvarFormaPagamento() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    this.formaPagamentoSalvar.tipoPagamento = this.tipoPagamentoSelecionado;
    
    if (this.formaPagamentoSalvar.id) {
      this.alterarFormaPagamento();
    } else {
      this.inserirFormaPagamento();
    }
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

  listarTipoPagamentos() {
    this.isGlobalLoading = true;
    this.tipoPagamentoService.listarTipoPagamentos().subscribe(
      {
        next: (response: ApiCollectionResponse<TipoPagamento>) => {
          this.tiposPagamentos = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarFormaPagamento(idFormaPagamento: string) {
    this.isGlobalLoading = true;
    this.formaPagamentoService.buscarFormaPagamentoPorId(idFormaPagamento).subscribe(
      {
        next: (response: FormaPagamento) => {
          this.isGlobalLoading = false;
          this.formaPagamentoSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirFormaPagamento() {
    this.isGlobalLoading = true;
    this.formaPagamentoService.inserirFormaPagamento(this.formaPagamentoSalvar).subscribe(
      {
        next: (response: FormaPagamento) => {
          this.listarFormaPagamentos();
          this.isGlobalLoading = false;
          this.formaPagamentoSalvar = new FormaPagamento();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'FormaPagamento inserido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarFormaPagamento() {
    this.formaPagamentoService.alterarFormaPagamento(this.formaPagamentoSalvar).subscribe(
      {
        next: (response: FormaPagamento) => {
          this.listarFormaPagamentos();
          this.formaPagamentoSalvar = new FormaPagamento();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'FormaPagamento alterado com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerFormaPagamento(idFormaPagamento: string) {
    this.isGlobalLoading = true;
    this.formaPagamentoService.removerFormaPagamento(idFormaPagamento).subscribe(
      {
        next: () => {
          this.listarFormaPagamentos();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'FormaPagamento removido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.formaPagamentoSalvar = new FormaPagamento();
    this.tipoPagamentoSelecionado = new FormaPagamento();
  }

  abreSlideEditar(formaPagamento: FormaPagamento) {
    this.displaySaveBar = true;
    this.formaPagamentoSalvar = { ...formaPagamento }
    this.tipoPagamentoSelecionado = { ...formaPagamento.tipoPagamento }
  }

  abreModalExclusao(formaPagamento: FormaPagamento) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a formaPagamento?',
      accept: () => {
        this.removerFormaPagamento(formaPagamento.id!)
      }
    });
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

  abreModalTipoPagamento() {
    this.tipoPagamentoModal = true;
  }
}
