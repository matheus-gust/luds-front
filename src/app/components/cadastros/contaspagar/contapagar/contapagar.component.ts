import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { ContaPagar } from '../model/contapagar.model';
import { ContaPagarService } from '../service/contapagar-service';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { FormaPagamentoService } from '../../formapagamento/service/formapagamento-service';
import { FormaPagamento } from '../../formapagamento/model/formapagamento.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-constasPagar',
  templateUrl: './contapagar.component.html',
  styleUrls: ['./contapagar.component.css']
})
export class ContaPagarsComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  modalMarcarPagoVisible = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  constasPagar: ContaPagar[] = [];
  contaPagarSalvar: ContaPagar = new ContaPagar();
  contaMarcaPago: ContaPagar = new ContaPagar();

  formaPagamentos: FormaPagamento[] = [];
  formaPagamentoSelecionada: FormaPagamento;

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;
  @ViewChild('fPago', { static: false }) formularioPago: NgForm;

  constructor(
    private contaPagarService: ContaPagarService,
    private formaPagamentoService: FormaPagamentoService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Contas a Pagar' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarContaPagars();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'dataVencimento', header: 'Data de Vencimento', class: 'dataVencimento' },
      { field: 'formaPagamento.nome', header: 'Forma de Pagamento', class: 'formaPagamento' },
      { field: 'valor', header: 'Valor', class: 'valor' },
    ];
  }

  salvarContaPagar() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if (this.contaPagarSalvar.id) {
      this.alterarContaPagar();
    } else {
      this.inserirContaPagar();
    }
  }

  listarContaPagars() {
    this.isGlobalLoading = true;
    this.contaPagarService.listarContaPagars().subscribe(
      {
        next: (response: ApiCollectionResponse<ContaPagar>) => {
          this.constasPagar = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarFormaPagamentos() {
    this.formaPagamentoService.listarFormaPagamentos().subscribe(
      {
        next: (response: ApiCollectionResponse<FormaPagamento>) => {
          this.formaPagamentos = response.items;
        }, error: () => {
        }
      }
    )
  }

  buscarContaPagar(idContaPagar: string) {
    this.isGlobalLoading = true;
    this.contaPagarService.buscarContaPagarPorId(idContaPagar).subscribe(
      {
        next: (response: ContaPagar) => {
          this.isGlobalLoading = false;
          this.contaPagarSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirContaPagar() {
    this.isGlobalLoading = true;
    this.contaPagarService.inserirContaPagar(this.contaPagarSalvar).subscribe(
      {
        next: (response: ContaPagar) => {
          this.listarContaPagars();
          this.isGlobalLoading = false;
          this.contaPagarSalvar = new ContaPagar();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ContaPagar inserido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarContaPagar() {
    this.contaPagarService.alterarContaPagar(this.contaPagarSalvar).subscribe(
      {
        next: (response: ContaPagar) => {
          this.listarContaPagars();
          this.contaPagarSalvar = new ContaPagar();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ContaPagar alterado com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerContaPagar(idContaPagar: string) {
    this.isGlobalLoading = true;
    this.contaPagarService.removerContaPagar(idContaPagar).subscribe(
      {
        next: () => {
          this.listarContaPagars();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ContaPagar removido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.contaPagarSalvar = new ContaPagar();
    this.formaPagamentoSelecionada = new FormaPagamento();
  }

  abreSlideEditar(contaPagar: ContaPagar) {
    this.displaySaveBar = true;
    this.contaPagarSalvar = { ...contaPagar }
    this.listarFormaPagamentos();
  }

  abreModalExclusao(contaPagar: ContaPagar) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a contaPagar?',
      accept: () => {
        this.removerContaPagar(contaPagar.id!)
      }
    });
  }

  getFieldValue(rowData: any, col: any): any {
    const fields = col.field.split('.');
    let value = rowData;
    for (const f of fields) {
      value = value[f];
      if (value === undefined || value === null) {
        return null;
      }
    }
    return value;
  }

  abreModalMarcarPago(contaPagar: ContaPagar) {
    this.modalMarcarPagoVisible = true;
    this.contaMarcaPago = contaPagar;
  }

  marcaContaPago() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioPago, 'fPago')) {
      return;
    }
    this.contaPagarService.marcaContaPago(this.contaMarcaPago.id, this.formaPagamentoSelecionada).subscribe(
      () => {
        this.listarContaPagars();
        this.fechalModalMarcarPago();
      }
    );
  }

  fechalModalMarcarPago() {
    this.modalMarcarPagoVisible = false;
    this.formaPagamentoSelecionada = new FormaPagamento();
    this.contaMarcaPago = new ContaPagar();
  }
}
