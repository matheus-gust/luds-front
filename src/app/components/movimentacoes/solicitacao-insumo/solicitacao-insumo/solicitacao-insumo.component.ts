import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Insumo } from 'src/app/components/cadastros/insumos/model/insumo.model';
import { InsumoService } from 'src/app/components/cadastros/insumos/service/insumo-service';
import { Unidade } from 'src/app/components/cadastros/unidade/model/unidade.model';
import { UnidadeService } from 'src/app/components/cadastros/unidade/service/unidade-service';
import { SolicitacaoInsumo } from '../model/solicitacao-insumo.model';
import { SolicitacaoInsumoService } from '../service/solicitacao-insumo-service';

@Component({
  selector: 'app-solicitacao-insumo',
  templateUrl: './solicitacao-insumo.component.html',
  styleUrls: ['./solicitacao-insumo.component.css']
})
export class SolicitacaoInsumoComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  solicitacaoInsumos: SolicitacaoInsumo[] = [];
  solicitacaoInsumoSalvar: SolicitacaoInsumo = new SolicitacaoInsumo();

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  insumos: Insumo[] = [
  ];
  unidades: Unidade[] = [
  ];

  insumoSelecionado: Insumo;
  unidadeSelecionada: Unidade;

  public colunas: any[];

  constructor(
    private insumoService: InsumoService,
    private unidadeService: UnidadeService,
    private solicitacaoInsumoService: SolicitacaoInsumoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Movimentacoes' },
      { label: 'Solicitação-Insumo' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarSolicitacaoInsumos();
    this.listarInsumos();
    this.listarUnidades();

    this.colunas = [
      { field: 'unidade.nome', header: 'Unidade', class: 'unidade.nome' },
      { field: 'insumo.nome', header: 'Insumo', class: 'insumo.nome' },
      { field: 'quantidadeSolicitada', header: 'Quantidade', class: 'quantidadeSolicitada' }
    ];
  }

  salvarSolicitacaoInsumo() {
    if (this.solicitacaoInsumoSalvar.id) {
      this.alterarSolicitacaoInsumo();
    } else {
      this.inserirSolicitacaoInsumo();
    }
  }

  listarSolicitacaoInsumos() {
    this.isGlobalLoading = true;
    this.solicitacaoInsumoService.listarSolicitacaoInsumos().subscribe(
      {
        next: (response: ApiCollectionResponse<SolicitacaoInsumo>) => {
          this.solicitacaoInsumos = response.items;
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarInsumos() {
    this.insumos = [];
    this.isGlobalLoading = true;
    this.insumoService.listarInsumos().subscribe(
      {
        next: (response: ApiCollectionResponse<Insumo>) => {
          response.items.forEach(insumo => {
            this.insumos.push(insumo);
          });
          this.isGlobalLoading = false;
        }
      }
    )
  }

  listarUnidades() {
    this.unidades = [];
    this.isGlobalLoading = true;
    this.unidadeService.listarUnidades().subscribe(
      {
        next: (response: ApiCollectionResponse<Unidade>) => {
          response.items.forEach(unidade => {
            this.unidades.push(unidade);
          });
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarSolicitacaoInsumo(idSolicitacaoInsumo: string) {
    this.isGlobalLoading = true;
    this.solicitacaoInsumoService.buscarSolicitacaoInsumoPorId(idSolicitacaoInsumo).subscribe(
      {
        next: (response: SolicitacaoInsumo) => {
          this.isGlobalLoading = false;
          this.solicitacaoInsumoSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirSolicitacaoInsumo() {
    this.solicitacaoInsumoSalvar.insumo = this.insumoSelecionado;
    this.solicitacaoInsumoSalvar.unidade = this.unidadeSelecionada;
    this.isGlobalLoading = true;
    this.solicitacaoInsumoService.inserirSolicitacaoInsumo(this.solicitacaoInsumoSalvar).subscribe(
      {
        next: (response: SolicitacaoInsumo) => {
          this.listarSolicitacaoInsumos();
          this.isGlobalLoading = false;
          this.solicitacaoInsumoSalvar = new SolicitacaoInsumo();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Solicitação inserida com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarSolicitacaoInsumo() {
    this.solicitacaoInsumoService.alterarSolicitacaoInsumo(this.solicitacaoInsumoSalvar).subscribe(
      {
        next: (response: SolicitacaoInsumo) => {
          this.listarSolicitacaoInsumos();
          this.solicitacaoInsumoSalvar = new SolicitacaoInsumo();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Solicitação alterada com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerSolicitacaoInsumo(idSolicitacaoInsumo: string) {
    this.isGlobalLoading = true;
    this.solicitacaoInsumoService.removerSolicitacaoInsumo(idSolicitacaoInsumo).subscribe(
      {
        next: () => {
          this.listarSolicitacaoInsumos();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Solicitação removida com sucesso'});

        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.solicitacaoInsumoSalvar = new SolicitacaoInsumo();
    this.unidadeSelecionada = new Unidade();
    this.insumoSelecionado = new Insumo();
  }

  abreSlideEditar(solicitacaoInsumo: SolicitacaoInsumo) {
    this.displaySaveBar = true;
    this.unidadeSelecionada = solicitacaoInsumo.unidade;
    this.insumoSelecionado = solicitacaoInsumo.insumo;
    this.solicitacaoInsumoSalvar = { ...solicitacaoInsumo }
  }

  abreModalExclusao(solicitacaoInsumo: SolicitacaoInsumo) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a solicitacaoInsumo?',
      accept: () => {
        this.removerSolicitacaoInsumo(solicitacaoInsumo.id)
      }
    });
  }

  defineValorPropriedade(objeto: any, atributos: string[]): string {
    if(atributos.length > 1) {
      return this.defineValorPropriedade(objeto[atributos[0]], atributos.slice(1, atributos.length));
    }
    return objeto[atributos[0]];
  }

}
