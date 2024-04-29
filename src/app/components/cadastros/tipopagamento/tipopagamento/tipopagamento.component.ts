import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { TipoPagamento } from '../model/tipopagamento.model';
import { TipoPagamentoService } from '../service/tipopagamento-service';
import { Fornecedor } from '../../fornecedores/model/fornecedor.model';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';

@Component({
  selector: 'app-tipoPagamentos',
  templateUrl: './tipopagamento.component.html',
  styleUrls: ['./tipopagamento.component.css']
})
export class TipoPagamentosComponent implements OnInit {

  @Input() hospedeiro: boolean;

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  tipoPagamentos: TipoPagamento[] = [];
  tipoPagamentoSalvar: TipoPagamento = new TipoPagamento();

  fornecedor: Fornecedor;
  fornecedores: Fornecedor[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(    
    private tipoPagamentoService: TipoPagamentoService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Tipo de Pagamentos' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarTipoPagamentos();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
    ];
  }

  salvarTipoPagamento() {
    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if(this.tipoPagamentoSalvar.id) {
      this.alterarTipoPagamento();
    } else {
      this.inserirTipoPagamento();
    }
  }

  listarTipoPagamentos() {
    this.isGlobalLoading = true;
    this.tipoPagamentoService.listarTipoPagamentos().subscribe(
      {
        next: (response: ApiCollectionResponse<TipoPagamento>) => {
          this.tipoPagamentos = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarTipoPagamento(idTipoPagamento: string) {
    this.isGlobalLoading = true;
    this.tipoPagamentoService.buscarTipoPagamentoPorId(idTipoPagamento).subscribe(
      {
        next: (response: TipoPagamento) => {
          this.isGlobalLoading = false;
          this.tipoPagamentoSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirTipoPagamento() {
    this.isGlobalLoading = true;
    this.tipoPagamentoService.inserirTipoPagamento(this.tipoPagamentoSalvar).subscribe(
      {
        next: (response: TipoPagamento) => {
          this.listarTipoPagamentos();
          this.isGlobalLoading = false;
          this.tipoPagamentoSalvar = new TipoPagamento();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'TipoPagamento inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarTipoPagamento() {
    this.tipoPagamentoService.alterarTipoPagamento(this.tipoPagamentoSalvar).subscribe(
      {
        next: (response: TipoPagamento) => {
          this.listarTipoPagamentos();
          this.tipoPagamentoSalvar = new TipoPagamento();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'TipoPagamento alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerTipoPagamento(idTipoPagamento: string) {
    this.isGlobalLoading = true;
    this.tipoPagamentoService.removerTipoPagamento(idTipoPagamento).subscribe(
      {
        next: () => {
          this.listarTipoPagamentos();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'TipoPagamento removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.tipoPagamentoSalvar = new TipoPagamento();
  }

  abreSlideEditar(tipoPagamento: TipoPagamento) {
    this.displaySaveBar = true; 
    this.tipoPagamentoSalvar = {...tipoPagamento}
  }

  abreModalExclusao(tipoPagamento: TipoPagamento) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a tipoPagamento?',
      accept: () => {
          this.removerTipoPagamento(tipoPagamento.id!)
      }
  });
  }

}
