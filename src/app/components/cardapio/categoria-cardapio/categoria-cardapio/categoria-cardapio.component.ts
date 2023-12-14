import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaCardapio } from '../model/categoria-cardapio.model';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { CategoriaCardapioService } from '../service/categoria-cardapio.service';
import { NgForm } from '@angular/forms';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';

@Component({
  selector: 'app-categoria-cardapio',
  templateUrl: './categoria-cardapio.component.html',
  styleUrls: ['./categoria-cardapio.component.css']
})
export class CategoriaCardapioComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  categoriaCardapios: CategoriaCardapio[] = [];
  categoriaCardapioSalvar: CategoriaCardapio = new CategoriaCardapio();

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(
    private categoriaCardapioService: CategoriaCardapioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formValidService: FormValidService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'CategoriaCardapios' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarCategoriaCardapios();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' }
    ];
  }

  salvarCategoriaCardapio() {

    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormularioAdicionar')) {
      this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormularioAdicionar')
    }

    if (this.categoriaCardapioSalvar.id) {
      this.alterarCategoriaCardapio();
    } else {
      this.inserirCategoriaCardapio();
    }
  }

  listarCategoriaCardapios() {
    this.isGlobalLoading = true;
    this.categoriaCardapioService.listarCategoriaCardapios().subscribe(
      {
        next: (response: ApiCollectionResponse<CategoriaCardapio>) => {
          this.categoriaCardapios = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarCategoriaCardapio(idCategoriaCardapio: string) {
    this.isGlobalLoading = true;
    this.categoriaCardapioService.buscarCategoriaCardapioPorId(idCategoriaCardapio).subscribe(
      {
        next: (response: CategoriaCardapio) => {
          this.isGlobalLoading = false;
          this.categoriaCardapioSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirCategoriaCardapio() {
    this.isGlobalLoading = true;
    this.categoriaCardapioService.inserirCategoriaCardapio(this.categoriaCardapioSalvar).subscribe(
      {
        next: (response: CategoriaCardapio) => {
          this.listarCategoriaCardapios();
          this.isGlobalLoading = false;
          this.categoriaCardapioSalvar = new CategoriaCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'CategoriaCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarCategoriaCardapio() {
    this.categoriaCardapioService.alterarCategoriaCardapio(this.categoriaCardapioSalvar).subscribe(
      {
        next: (response: CategoriaCardapio) => {
          this.listarCategoriaCardapios();
          this.categoriaCardapioSalvar = new CategoriaCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'CategoriaCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerCategoriaCardapio(idCategoriaCardapio: string) {
    this.isGlobalLoading = true;
    this.categoriaCardapioService.removerCategoriaCardapio(idCategoriaCardapio).subscribe(
      {
        next: () => {
          this.listarCategoriaCardapios();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'CategoriaCardapio removida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.categoriaCardapioSalvar = new CategoriaCardapio();
  }

  abreSlideEditar(categoriaCardapio: CategoriaCardapio) {
    this.displaySaveBar = true;
    this.categoriaCardapioSalvar = { ...categoriaCardapio }
  }

  abreModalExclusao(categoriaCardapio: CategoriaCardapio) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a categoriaCardapio?',
      accept: () => {
        this.removerCategoriaCardapio(categoriaCardapio.id!)
      }
    });
  }

}
