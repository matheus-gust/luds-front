import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { UnidadeMedida } from '../model/unidademedida.model';
import { UnidadeMedidaService } from '../service/unidademedida-service';
import { Fornecedor } from '../../fornecedores/model/fornecedor.model';

@Component({
  selector: 'app-unidadeMedidas',
  templateUrl: './unidademedida.component.html',
  styleUrls: ['./unidademedida.component.css']
})
export class UnidadeMedidasComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  unidadeMedidas: UnidadeMedida[] = [];
  unidadeMedidaSalvar: UnidadeMedida = new UnidadeMedida();

  fornecedor: Fornecedor;
  fornecedores: Fornecedor[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  constructor(    
    private unidadeMedidaService: UnidadeMedidaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'UnidadeMedidas' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarUnidadeMedidas();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
    ];
  }

  salvarUnidadeMedida() {
    if(this.unidadeMedidaSalvar.id) {
      this.alterarUnidadeMedida();
    } else {
      this.inserirUnidadeMedida();
    }
  }

  listarUnidadeMedidas() {
    this.isGlobalLoading = true;
    this.unidadeMedidaService.listarUnidadeMedidas().subscribe(
      {
        next: (response: ApiCollectionResponse<UnidadeMedida>) => {
          this.unidadeMedidas = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarUnidadeMedida(idUnidadeMedida: string) {
    this.isGlobalLoading = true;
    this.unidadeMedidaService.buscarUnidadeMedidaPorId(idUnidadeMedida).subscribe(
      {
        next: (response: UnidadeMedida) => {
          this.isGlobalLoading = false;
          this.unidadeMedidaSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirUnidadeMedida() {
    this.isGlobalLoading = true;
    this.unidadeMedidaService.inserirUnidadeMedida(this.unidadeMedidaSalvar).subscribe(
      {
        next: (response: UnidadeMedida) => {
          this.listarUnidadeMedidas();
          this.isGlobalLoading = false;
          this.unidadeMedidaSalvar = new UnidadeMedida();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'UnidadeMedida inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarUnidadeMedida() {
    this.unidadeMedidaService.alterarUnidadeMedida(this.unidadeMedidaSalvar).subscribe(
      {
        next: (response: UnidadeMedida) => {
          this.listarUnidadeMedidas();
          this.unidadeMedidaSalvar = new UnidadeMedida();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'UnidadeMedida alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerUnidadeMedida(idUnidadeMedida: string) {
    this.isGlobalLoading = true;
    this.unidadeMedidaService.removerUnidadeMedida(idUnidadeMedida).subscribe(
      {
        next: () => {
          this.listarUnidadeMedidas();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'UnidadeMedida removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.unidadeMedidaSalvar = new UnidadeMedida();
  }

  abreSlideEditar(unidadeMedida: UnidadeMedida) {
    this.displaySaveBar = true; 
    this.unidadeMedidaSalvar = {...unidadeMedida}
  }

  abreModalExclusao(unidadeMedida: UnidadeMedida) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a unidadeMedida?',
      accept: () => {
          this.removerUnidadeMedida(unidadeMedida.id!)
      }
  });
  }

}
