import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Categoria } from '../model/categoria.model';
import { Fornecedor } from '../../fornecedores/model/fornecedor.model';
import { FornecedorService } from '../../fornecedores/service/fornecedor-service';
import { UnidadeMedida } from '../../unidademedida/model/unidademedida.model';
import { UnidadeMedidaService } from '../../unidademedida/service/unidademedida-service';
import { CategoriaService } from '../service/cotegoria-service';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriasComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  categorias: Categoria[] = [];
  categoriaSalvar: Categoria = new Categoria();

  fornecedor: Fornecedor;
  fornecedores: Fornecedor[] = [];

  unidadeMedidaSelecionada: UnidadeMedida;
  unidadesMedida: UnidadeMedida[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(    
    private categoriaService: CategoriaService,
    private fornecedorService: FornecedorService,
    private unidadeMedidaService: UnidadeMedidaService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Categorias' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarCategorias();
    this.listarFornecedores();
    this.listarUnidadeMedidas();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' }
    ];
  }

  salvarCategoria() {
    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if(this.categoriaSalvar.id) {
      this.alterarCategoria();
    } else {
      this.inserirCategoria();
    }
  }

  listarUnidadeMedidas() {
    this.isGlobalLoading = true;
    this.unidadeMedidaService.listarUnidadeMedidas().subscribe(
      {
        next: (response: ApiCollectionResponse<UnidadeMedida>) => {
          this.unidadesMedida = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarCategorias() {
    this.isGlobalLoading = true;
    this.categoriaService.listarCategorias().subscribe(
      {
        next: (response: ApiCollectionResponse<Categoria>) => {
          this.categorias = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarCategoria(idCategoria: string) {
    this.isGlobalLoading = true;
    this.categoriaService.buscarCategoriaPorId(idCategoria).subscribe(
      {
        next: (response: Categoria) => {
          this.isGlobalLoading = false;
          this.categoriaSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirCategoria() {
    this.isGlobalLoading = true;
    this.categoriaSalvar.fornecedor = this.fornecedor?.id;
    this.categoriaSalvar.unidadeMedida = this.unidadeMedidaSelecionada?.id;
    this.categoriaService.inserirCategoria(this.categoriaSalvar).subscribe(
      {
        next: (response: Categoria) => {
          this.listarCategorias();
          this.isGlobalLoading = false;
          this.categoriaSalvar = new Categoria();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Categoria inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarCategoria() {
    this.categoriaService.alterarCategoria(this.categoriaSalvar).subscribe(
      {
        next: (response: Categoria) => {
          this.listarCategorias();
          this.categoriaSalvar = new Categoria();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Categoria alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerCategoria(idCategoria: string) {
    this.isGlobalLoading = true;
    this.categoriaService.removerCategoria(idCategoria).subscribe(
      {
        next: () => {
          this.listarCategorias();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Categoria removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarFornecedores() {
    this.isGlobalLoading = true;
    this.fornecedorService.listarFornecedores().subscribe(
      {
        next: (response: ApiCollectionResponse<Fornecedor>) => {
          this.fornecedores = response.items;
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.categoriaSalvar = new Categoria();
    this.fornecedor = new Fornecedor();
    this.unidadeMedidaSelecionada = new UnidadeMedida();
  }

  abreSlideEditar(categoria: Categoria) {
    this.displaySaveBar = true; 
    this.categoriaSalvar = {...categoria}
  }

  abreModalExclusao(categoria: Categoria) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a categoria?',
      accept: () => {
          this.removerCategoria(categoria.id!)
      }
  });
  }

}
