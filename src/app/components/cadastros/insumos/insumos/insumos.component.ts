import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Insumo } from '../model/insumo.model';
import { InsumoService } from '../service/insumo-service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  insumos: Insumo[] = [];
  insumoSalvar: Insumo = new Insumo();

  isGlobalLoading: boolean = false;


  constructor(    
    private insumoService: InsumoService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Insumos' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarInsumos();
  }

  salvarInsumo() {
    if(this.insumoSalvar.id) {
      this.alterarInsumo();
    } else {
      this.inserirInsumo();
    }
  }

  listarInsumos() {
    this.isGlobalLoading = true;
    this.insumoService.listarInsumos().subscribe(
      {
        next: (response: ApiCollectionResponse<Insumo>) => {
          this.insumos = response.items;
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarInsumo(idInsumo: string) {
    this.isGlobalLoading = true;
    this.insumoService.buscarInsumoPorId(idInsumo).subscribe(
      {
        next: (response: Insumo) => {
          this.isGlobalLoading = false;
          this.insumoSalvar = response;
        }
      }
    )
  }

  inserirInsumo() {
    this.isGlobalLoading = true;
    this.insumoService.inserirInsumo(this.insumoSalvar).subscribe(
      {
        next: (response: Insumo) => {
          this.listarInsumos();
          this.isGlobalLoading = false;
          this.insumoSalvar = new Insumo();
          this.displaySaveBar = false;
        }
      }
    )
  }

  alterarInsumo() {
    this.insumoService.alterarInsumo(this.insumoSalvar).subscribe(
      {
        next: (response: Insumo) => {
          this.listarInsumos();
          this.insumoSalvar = new Insumo();
          this.displaySaveBar = false;
        }
      }
    )
  }

  removerInsumo(idInsumo: string) {
    this.isGlobalLoading = true;
    this.insumoService.removerInsumo(idInsumo).subscribe(
      {
        next: () => {
          this.listarInsumos();
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.insumoSalvar = new Insumo();
  }

  abreSlideEditar(insumo: Insumo) {
    this.displaySaveBar = true; 
    this.insumoSalvar = {...insumo}
  }

  abreModalExclusao(insumo: Insumo) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a insumo?',
      accept: () => {
          this.removerInsumo(insumo.id!)
      }
  });
  }

}
