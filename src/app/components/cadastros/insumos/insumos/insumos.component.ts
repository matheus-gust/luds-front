import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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
        }, error: () => {
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
        }, error: () => {
          this.isGlobalLoading = false;
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
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Insumo inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
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
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Insumo alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
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
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Insumo removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
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
