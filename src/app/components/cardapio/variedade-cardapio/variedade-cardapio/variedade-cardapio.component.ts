import { Component, OnInit, ViewChild } from '@angular/core';
import { VariedadeCardapio } from '../model/variedade-cardapio.model';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { VariedadeCardapioService } from '../service/variedade-cardapio.service';
import { NgForm } from '@angular/forms';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { CategoriaCardapio } from '../../categoria-cardapio/model/categoria-cardapio.model';
import { CategoriaCardapioService } from '../../categoria-cardapio/service/categoria-cardapio.service';

@Component({
  selector: 'app-variedade-cardapio',
  templateUrl: './variedade-cardapio.component.html',
  styleUrls: ['./variedade-cardapio.component.css']
})
export class VariedadeCardapioComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  variedadeCardapios: VariedadeCardapio[] = [];
  variedadeCardapioSalvar: VariedadeCardapio = new VariedadeCardapio();

  categoriaCardapioSelecionada: CategoriaCardapio = new CategoriaCardapio();
  categoriasCardapio: CategoriaCardapio[] = [];

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  public colunas: any[];

  @ViewChild('fVariedadeCardapio', { static: true }) formularioAdicionarVariedadeCardapio = new NgForm([], []);

  constructor(
    private variedadeCardapioService: VariedadeCardapioService,
    private categoriaCardapioService: CategoriaCardapioService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formValidService: FormValidService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'VariedadeCardapios' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarVariedadeCardapios();
    this.listarCategoriasCardapio();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'categoriaCardapio', header: 'Cartegoria', class: 'categoria' }
    ];
  }

  salvarVariedadeCardapio() {

    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionarVariedadeCardapio, 'formAdicionarVariedadeCardapio')) {
      this.formValidService.validaFormularioInsercao(this.formularioAdicionarVariedadeCardapio, 'formAdicionarVariedadeCardapio')
    }

    if (this.variedadeCardapioSalvar.id) {
      this.alterarVariedadeCardapio();
    } else {
      this.inserirVariedadeCardapio();
    }
  }

  listarVariedadeCardapios() {
    this.isGlobalLoading = true;
    this.variedadeCardapioService.listarVariedadeCardapios().subscribe(
      {
        next: (response: ApiCollectionResponse<VariedadeCardapio>) => {
          this.variedadeCardapios = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarCategoriasCardapio() {
    this.isGlobalLoading = true;
    this.categoriaCardapioService.listarCategoriaCardapios().subscribe(
      {
        next: (response: ApiCollectionResponse<CategoriaCardapio>) => {
          this.categoriasCardapio = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarVariedadeCardapio(idVariedadeCardapio: string) {
    this.isGlobalLoading = true;
    this.variedadeCardapioService.buscarVariedadeCardapioPorId(idVariedadeCardapio).subscribe(
      {
        next: (response: VariedadeCardapio) => {
          this.isGlobalLoading = false;
          this.variedadeCardapioSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirVariedadeCardapio() {
    this.isGlobalLoading = true;
    this.variedadeCardapioSalvar.categoriaCardapio = this.categoriaCardapioSelecionada;
    this.variedadeCardapioService.inserirVariedadeCardapio(this.variedadeCardapioSalvar).subscribe(
      {
        next: (response: VariedadeCardapio) => {
          this.listarVariedadeCardapios();
          this.isGlobalLoading = false;
          this.variedadeCardapioSalvar = new VariedadeCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'VariedadeCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarVariedadeCardapio() {
    this.variedadeCardapioSalvar.categoriaCardapio = this.categoriaCardapioSelecionada;
    this.variedadeCardapioService.alterarVariedadeCardapio(this.variedadeCardapioSalvar).subscribe(
      {
        next: (response: VariedadeCardapio) => {
          this.listarVariedadeCardapios();
          this.variedadeCardapioSalvar = new VariedadeCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'VariedadeCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerVariedadeCardapio(idVariedadeCardapio: string) {
    this.isGlobalLoading = true;
    this.variedadeCardapioService.removerVariedadeCardapio(idVariedadeCardapio).subscribe(
      {
        next: () => {
          this.listarVariedadeCardapios();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'VariedadeCardapio removida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.variedadeCardapioSalvar = new VariedadeCardapio();
  }

  abreSlideEditar(variedadeCardapio: VariedadeCardapio) {
    this.displaySaveBar = true;
    this.variedadeCardapioSalvar = { ...variedadeCardapio }
  }

  abreModalExclusao(variedadeCardapio: VariedadeCardapio) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a variedadeCardapio?',
      accept: () => {
        this.removerVariedadeCardapio(variedadeCardapio.id!)
      }
    });
  }

}
