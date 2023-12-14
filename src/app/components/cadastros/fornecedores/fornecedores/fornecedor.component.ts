import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../service/fornecedor-service';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedoresComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  fornecedores: Fornecedor[] = [];
  fornecedorSalvar: Fornecedor = new Fornecedor();

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(    
    private fornecedorService: FornecedorService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Fornecedores' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarFornecedores();

    this.colunas = [
      { field: 'codigo', header: 'Código', class: 'codigo' },
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'diaEntregaPrev', header: 'Dias Previsto Entrega', class: 'diaEntregaPrev' },
      { field: 'diaEntregaSemana', header: 'Dia Semana Entrega', class: 'diaEntregaSemana' },
    ];
  }

  salvarFornecedor() {
    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if(this.fornecedorSalvar.id) {
      this.alterarFornecedor();
    } else {
      this.inserirFornecedor();
    }
  }

  listarFornecedores() {
    this.isGlobalLoading = true;
    this.fornecedorService.listarFornecedores().subscribe(
      {
        next: (response: ApiCollectionResponse<Fornecedor>) => {
          this.fornecedores = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarFornecedor(idFornecedor: string) {
    this.isGlobalLoading = true;
    this.fornecedorService.buscarFornecedorPorId(idFornecedor).subscribe(
      {
        next: (response: Fornecedor) => {
          this.isGlobalLoading = false;
          this.fornecedorSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirFornecedor() {
    this.isGlobalLoading = true;
    this.fornecedorService.inserirFornecedor(this.fornecedorSalvar).subscribe(
      {
        next: (response: Fornecedor) => {
          this.listarFornecedores();
          this.isGlobalLoading = false;
          this.fornecedorSalvar = new Fornecedor();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Fornecedor inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarFornecedor() {
    this.fornecedorService.alterarFornecedor(this.fornecedorSalvar).subscribe(
      {
        next: (response: Fornecedor) => {
          this.listarFornecedores();
          this.fornecedorSalvar = new Fornecedor();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Fornecedor alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerFornecedor(idFornecedor: string) {
    this.isGlobalLoading = true;
    this.fornecedorService.removerFornecedor(idFornecedor).subscribe(
      {
        next: () => {
          this.listarFornecedores();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Fornecedor removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.fornecedorSalvar = new Fornecedor();
  }

  abreSlideEditar(fornecedor: Fornecedor) {
    this.displaySaveBar = true; 
    this.fornecedorSalvar = {...fornecedor}
  }

  abreModalExclusao(fornecedor: Fornecedor) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a fornecedor?',
      accept: () => {
          this.removerFornecedor(fornecedor.id!)
      }
  });
  }

}
