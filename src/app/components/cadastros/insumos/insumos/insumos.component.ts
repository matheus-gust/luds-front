import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Insumo } from '../model/insumo.model';
import { InsumoService } from '../service/insumo-service';
import { UnidadeMedida } from '../../unidademedida/model/unidademedida.model';
import { UnidadeMedidaService } from '../../unidademedida/service/unidademedida-service';
import { FormValidService } from 'src/app/commons/services/form-valid.service';
import { NgForm } from '@angular/forms';

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

  unidadeMedidaSelecionada: UnidadeMedida;
  unidadesMedida: UnidadeMedida[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(
    private insumoService: InsumoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Insumos' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarInsumos();
    this.listarUnidadeMedidas();

    this.colunas = [
      { field: 'codigo', header: 'Código', class: 'codigo' },
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'unidadeMedida.nome', header: 'Unidade Medida', class: 'unidadeMedida' }
    ];
  }

  salvarInsumo() {
    if (!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if (this.insumoSalvar.id) {
      this.alterarInsumo();
    } else {
      this.inserirInsumo();
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
    this.insumoSalvar.unidadeMedida = new UnidadeMedida();
    this.insumoSalvar.unidadeMedida.id = this.unidadeMedidaSelecionada?.id;
    this.insumoService.inserirInsumo(this.insumoSalvar).subscribe(
      {
        next: (response: Insumo) => {
          this.listarInsumos();
          this.isGlobalLoading = false;
          this.insumoSalvar = new Insumo();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Insumo inserido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarInsumo() {
    this.insumoSalvar.unidadeMedida = new UnidadeMedida();
    this.insumoSalvar.unidadeMedida.id = this.unidadeMedidaSelecionada?.id;
    this.insumoService.alterarInsumo(this.insumoSalvar).subscribe(
      {
        next: (response: Insumo) => {
          this.listarInsumos();
          this.insumoSalvar = new Insumo();
          this.displaySaveBar = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Insumo alterado com sucesso' });
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Insumo removido com sucesso' });
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true;
    this.insumoSalvar = new Insumo();
    this.unidadeMedidaSelecionada = new UnidadeMedida();
  }

  abreSlideEditar(insumo: Insumo) {
    this.displaySaveBar = true;
    this.insumoSalvar = { ...insumo };
    this.unidadeMedidaSelecionada = {...insumo.unidadeMedida};
  }

  abreModalExclusao(insumo: Insumo) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a insumo?',
      accept: () => {
        this.removerInsumo(insumo.id!)
      }
    });
  }

  getFieldValue(rowData: any, field: string): any {
    const fields = field.split('.'); // Dividindo o campo em partes se for aninhado
    let value = rowData;
    for (const f of fields) {
      value = value[f]; // Acessando o próximo nível do objeto
      if (value === undefined || value === null) {
        return null; // Se o campo for undefined ou null, retornamos null
      }
    }
    return value;
  }
}
