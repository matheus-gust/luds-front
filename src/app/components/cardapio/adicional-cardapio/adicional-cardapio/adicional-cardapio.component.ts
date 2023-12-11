import { Component, OnInit, ViewChild } from '@angular/core';
import { AdicionalCardapio } from '../model/adicional-cardapio.model';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { AdicionalCardapioService } from '../service/adicional-cardapio.service';
import { NgForm } from '@angular/forms';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { CategoriaCardapio } from '../../categoria-cardapio/model/categoria-cardapio.model';
import { CategoriaCardapioService } from '../../categoria-cardapio/service/categoria-cardapio.service';

@Component({
  selector: 'app-adicional-cardapio',
  templateUrl: './adicional-cardapio.component.html',
  styleUrls: ['./adicional-cardapio.component.css']
})
export class AdicionalCardapioComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  adicionalCardapios: AdicionalCardapio[] = [];
  adicionalCardapioSalvar: AdicionalCardapio = new AdicionalCardapio();

  categoriaCardapioSelecionada: CategoriaCardapio = new CategoriaCardapio();
  categoriasCardapio: CategoriaCardapio[] = [];

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  public colunas: any[];

  @ViewChild('fAdicionalCardapio', { static: true }) formularioAdicionarAdicionalCardapio = new NgForm([], []);

  constructor(
    private adicionalCardapioService: AdicionalCardapioService,
    private categoriaCardapioService: CategoriaCardapioService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formValidService: FormValidService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'AdicionalCardapios' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarCategoriasCardapio();
    this.listarAdicionalCardapios();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'categoriaCardapio', header: 'Categoria', class: 'categoria' }
    ];
  }

  salvarAdicionalCardapio() {

    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionarAdicionalCardapio, 'formAdicionarAdicionalCardapio')) {
      this.formValidService.validaFormularioInsercao(this.formularioAdicionarAdicionalCardapio, 'formAdicionarAdicionalCardapio')
    }

    if (this.adicionalCardapioSalvar.id) {
      this.alterarAdicionalCardapio();
    } else {
      this.inserirAdicionalCardapio();
    }
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

  listarAdicionalCardapios() {
    this.isGlobalLoading = true;
    this.adicionalCardapioService.listarAdicionalCardapios().subscribe(
      {
        next: (response: ApiCollectionResponse<AdicionalCardapio>) => {
          this.adicionalCardapios = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarAdicionalCardapio(idAdicionalCardapio: string) {
    this.isGlobalLoading = true;
    this.adicionalCardapioService.buscarAdicionalCardapioPorId(idAdicionalCardapio).subscribe(
      {
        next: (response: AdicionalCardapio) => {
          this.isGlobalLoading = false;
          this.adicionalCardapioSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirAdicionalCardapio() {
    this.adicionalCardapioSalvar.categoriaCardapio = this.categoriaCardapioSelecionada?.id;
    this.isGlobalLoading = true;
    this.adicionalCardapioService.inserirAdicionalCardapio(this.adicionalCardapioSalvar).subscribe(
      {
        next: (response: AdicionalCardapio) => {
          this.listarAdicionalCardapios();
          this.isGlobalLoading = false;
          this.adicionalCardapioSalvar = new AdicionalCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'AdicionalCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarAdicionalCardapio() {
    this.adicionalCardapioSalvar.categoriaCardapio = this.categoriaCardapioSelecionada?.id;

    this.adicionalCardapioService.alterarAdicionalCardapio(this.adicionalCardapioSalvar).subscribe(
      {
        next: (response: AdicionalCardapio) => {
          this.listarAdicionalCardapios();
          this.adicionalCardapioSalvar = new AdicionalCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'AdicionalCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerAdicionalCardapio(idAdicionalCardapio: string) {
    this.isGlobalLoading = true;
    this.adicionalCardapioService.removerAdicionalCardapio(idAdicionalCardapio).subscribe(
      {
        next: () => {
          this.listarAdicionalCardapios();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'AdicionalCardapio removida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.adicionalCardapioSalvar = new AdicionalCardapio();
  }

  abreSlideEditar(adicionalCardapio: AdicionalCardapio) {
    this.displaySaveBar = true;
    this.adicionalCardapioSalvar = { ...adicionalCardapio }
  }

  abreModalExclusao(adicionalCardapio: AdicionalCardapio) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a adicionalCardapio?',
      accept: () => {
        this.removerAdicionalCardapio(adicionalCardapio.id!)
      }
    });
  }

}
