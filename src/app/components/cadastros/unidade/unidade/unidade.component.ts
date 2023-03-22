import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Unidade } from '../model/unidade.model';
import { UnidadeService } from '../service/unidade-service';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  items: MenuItem[] = [];
  displaySaveBar: boolean = false;

  unidades: Unidade[] = [];
  unidadeSalvar: Unidade = new Unidade();

  isGlobalLoading: boolean = false;

  home: MenuItem = {};

  constructor(
    private unidadeService: UnidadeService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Unidades' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarUnidades();
  }

  salvarUnidade() {
    if(this.unidadeSalvar.id) {
      this.alterarUnidade();
    } else {
      this.inserirUnidade();
    }
  }

  listarUnidades() {
    this.isGlobalLoading = true;
    this.unidadeService.listarUnidades().subscribe(
      {
        next: (response: ApiCollectionResponse<Unidade>) => {
          this.unidades = response.items;
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarUnidade(idUnidade: string) {
    this.isGlobalLoading = true;
    this.unidadeService.buscarUnidadePorId(idUnidade).subscribe(
      {
        next: (response: Unidade) => {
          this.isGlobalLoading = false;
          this.unidadeSalvar = response;
        }
      }
    )
  }

  inserirUnidade() {
    this.isGlobalLoading = true;
    this.unidadeService.inserirUnidade(this.unidadeSalvar).subscribe(
      {
        next: (response: Unidade) => {
          this.listarUnidades();
          this.isGlobalLoading = false;
          this.unidadeSalvar = new Unidade();
          this.displaySaveBar = false;
        }
      }
    )
  }

  alterarUnidade() {
    this.unidadeService.alterarUnidade(this.unidadeSalvar).subscribe(
      {
        next: (response: Unidade) => {
          this.listarUnidades();
          this.unidadeSalvar = new Unidade();
          this.displaySaveBar = false;
        }
      }
    )
  }

  removerUnidade(idUnidade: string) {
    this.isGlobalLoading = true;
    this.unidadeService.removerUnidade(idUnidade).subscribe(
      {
        next: () => {
          this.listarUnidades();
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.unidadeSalvar = new Unidade();
  }

  abreSlideEditar(unidade: Unidade) {
    this.displaySaveBar = true; 
    this.unidadeSalvar = {...unidade}
  }

  abreModalExclusao(unidade: Unidade) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a unidade?',
      accept: () => {
          this.removerUnidade(unidade.id!)
      }
  });
  }

}
