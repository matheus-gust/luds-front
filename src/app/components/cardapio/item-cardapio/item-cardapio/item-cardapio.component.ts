import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ItemCardapio } from '../model/item-cardapio.model';
import { NgForm } from '@angular/forms';
import { ItemCardapioService } from '../service/item-cardapio.service';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { CategoriaCardapio } from '../../categoria-cardapio/model/categoria-cardapio.model';
import { CategoriaCardapioService } from '../../categoria-cardapio/service/categoria-cardapio.service';

export interface ItensListagem {
  categoria: CategoriaCardapio;
  itens: ItemCardapio[];
}

@Component({
  selector: 'app-item-cardapio',
  templateUrl: './item-cardapio.component.html',
  styleUrls: ['./item-cardapio.component.css']
})
export class ItemCardapioComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  itemCardapios: ItemCardapio[] = [];
  itemCardapioSalvar: ItemCardapio = new ItemCardapio();

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  public colunas: any[];

  categorias: CategoriaCardapio[] = [];

  categoriaSelecionada: CategoriaCardapio = new CategoriaCardapio();

  listagensDeItens: ItensListagem[] = [];

  itensCardapio: ItemCardapio[] = [
    {
      id: "0001",
      codigo: "0001",
      nome: "Pizza Calabresa",
      descricao: "Massa artesanal, Molho Lud's, Calabresa Defumada, Cebola e Finalização com ervas finas.",
      valor: 95.59,
      tamanho: "P,M,G",
      categoria: {
        id: "0001",
        nome: "Pizzas"
      },
      imagem: "",
    },
    {
      id: "0001",
      codigo: "0001",
      nome: "Pizza Calabresa",
      descricao: "Massa artesanal, Molho Lud's, Calabresa Defumada, Cebola e Finalização com ervas finas.",
      valor: 95.59,
      tamanho: "P,M,G",
      categoria: {
        id: "0001",
        nome: "Pizzas"
      },
      imagem: "",
    }
  ]

  @ViewChild('fItemCardapio', { static: true }) formularioAdicionarItemCardapio = new NgForm([], []);

  constructor(
    private itemCardapioService: ItemCardapioService,
    private confirmationService: ConfirmationService,
    private categoriaService: CategoriaCardapioService,
    private messageService: MessageService,
    private formValidService: FormValidService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'ItemCardapios' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarCategoriaCardapio();
    this.listarItemCardapios();

    this.colunas = [
      { field: 'codigo', header: 'Código', class: 'codigo' },
      { field: 'nome', header: 'Nome', class: 'nome' }
    ];
  }

  salvarItemCardapio() {

    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionarItemCardapio, 'formAdicionarItemCardapio')) {
      this.formValidService.validaFormularioInsercao(this.formularioAdicionarItemCardapio, 'formAdicionarItemCardapio')
    }

    if (this.itemCardapioSalvar.id) {
      this.alterarItemCardapio();
    } else {
      this.inserirItemCardapio();
    }
  }

  listarCategoriaCardapio() {
    this.isGlobalLoading = true;
    this.categorias = [];
    this.categoriaService.listarCategoriaCardapios().subscribe(
      {
        next: (response: ApiCollectionResponse<CategoriaCardapio>) => {
          response.items.forEach(item => this.categorias.push(item));
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarItemCardapios() {
    this.isGlobalLoading = true;
    this.itemCardapioService.listarItensCardapio().subscribe(
      {
        next: (response: ApiCollectionResponse<ItemCardapio>) => {
          this.itemCardapios = response.items;
          this.listagensDeItens = this.transformarParaItensListagem(response.items);
          console.log(this.listagensDeItens);
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarItemCardapio(idItemCardapio: string) {
    this.isGlobalLoading = true;
    this.itemCardapioService.buscarItemCardapioPorId(idItemCardapio).subscribe(
      {
        next: (response: ItemCardapio) => {
          this.isGlobalLoading = false;
          this.itemCardapioSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirItemCardapio() {
    this.isGlobalLoading = true;
    this.itemCardapioSalvar.categoria = new CategoriaCardapio();
    this.itemCardapioSalvar.categoria.id = this.categoriaSelecionada?.id;
    this.itemCardapioService.inserirItemCardapio(this.itemCardapioSalvar).subscribe(
      {
        next: (response: ItemCardapio) => {
          this.listarItemCardapios();
          this.isGlobalLoading = false;
          this.itemCardapioSalvar = new ItemCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ItemCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarItemCardapio() {
    this.itemCardapioSalvar.categoria = new CategoriaCardapio();
    this.itemCardapioSalvar.categoria.id = this.categoriaSelecionada?.id;
    this.itemCardapioService.alterarItemCardapio(this.itemCardapioSalvar).subscribe(
      {
        next: (response: ItemCardapio) => {
          this.listarItemCardapios();
          this.itemCardapioSalvar = new ItemCardapio();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ItemCardapio inserida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerItemCardapio(idItemCardapio: string) {
    this.isGlobalLoading = true;
    this.itemCardapioService.removerItemCardapio(idItemCardapio).subscribe(
      {
        next: () => {
          this.listarItemCardapios();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'ItemCardapio removida com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.itemCardapioSalvar = new ItemCardapio();
  }

  abreSlideEditar(itemCardapio: ItemCardapio) {
    this.displaySaveBar = true;
    this.itemCardapioSalvar = { ...itemCardapio }
  }

  abreModalExclusao(itemCardapio: ItemCardapio) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a itemCardapio?',
      accept: () => {
        this.removerItemCardapio(itemCardapio.id!)
      }
    });
  }

  adicionarImagem(evento: any) {
    var imagem = evento.target.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.itemCardapioSalvar.imagem =  myReader.result!.toString().split(',')[1];
    }
    myReader.readAsDataURL(imagem);
  }
  
  transformarParaItensListagem(itens: ItemCardapio[]): ItensListagem[] {
    const itensListagem: ItensListagem[] = [];
  
    const itensPorCategoria: { [categoriaId: string]: ItemCardapio[] } = {};
    itens.forEach((item) => {
      if (!itensPorCategoria[item.categoria.id]) {
        itensPorCategoria[item.categoria.id] = [];
      }
      itensPorCategoria[item.categoria.id].push(item);
    });
  
    for (const categoriaId in itensPorCategoria) {
      if (itensPorCategoria.hasOwnProperty(categoriaId)) {
        const categoria: CategoriaCardapio = {
          id: categoriaId,
          nome: itensPorCategoria[categoriaId][0].categoria.nome,
        };
  
        const itensDaCategoria: ItemCardapio[] = itensPorCategoria[categoriaId];
  
        const itensListagemCategoria: ItensListagem = {
          categoria,
          itens: itensDaCategoria,
        };
  
        itensListagem.push(itensListagemCategoria);
      }
    }
  
    return itensListagem;
  }
}
