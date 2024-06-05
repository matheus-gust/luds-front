import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ApiCollectionResponse } from 'src/app/commons/api-collection-response.model';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../service/cliente.service';
import { Fornecedor } from '../../fornecedores/model/fornecedor.model';
import { NgForm } from '@angular/forms';
import { FormValidService } from 'src/app/commons/services/form-valid.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClientesComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  displaySaveBar: boolean = false;

  clientes: Cliente[] = [];
  clienteSalvar: Cliente = new Cliente();

  fornecedor: Fornecedor;
  fornecedores: Fornecedor[] = [];

  isGlobalLoading: boolean = false;

  public colunas: any[];

  @ViewChild('fFormularioAdicionar', { static: false }) formularioAdicionar: NgForm;

  constructor(    
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private formValidService: FormValidService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Clientes' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.listarClientes();

    this.colunas = [
      { field: 'nome', header: 'Nome', class: 'nome' },
      { field: 'telefone', header: 'Telefone', class: 'telefone' },
      { field: 'telefoneAlternativo', header: 'Telefone Alternativo', class: 'telefoneAlternativo' },
      { field: 'dataNascimento', header: 'Data Nascimento', class: 'dataNascimento' }
    ];
  }

  salvarCliente() {
    if(!this.formValidService.validaFormularioInsercao(this.formularioAdicionar, 'fFormAdicionar')) {
      return;
    }

    if(this.clienteSalvar.id) {
      this.alterarCliente();
    } else {
      this.inserirCliente();
    }
  }

  listarClientes() {
    this.isGlobalLoading = true;
    this.clienteService.listarClientes().subscribe(
      {
        next: (response: ApiCollectionResponse<Cliente>) => {
          this.clientes = response.items;
          this.isGlobalLoading = false;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  buscarCliente(idCliente: string) {
    this.isGlobalLoading = true;
    this.clienteService.buscarClientePorId(idCliente).subscribe(
      {
        next: (response: Cliente) => {
          this.isGlobalLoading = false;
          this.clienteSalvar = response;
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  inserirCliente() {
    this.isGlobalLoading = true;
    this.clienteService.inserirCliente(this.clienteSalvar).subscribe(
      {
        next: (response: Cliente) => {
          this.listarClientes();
          this.isGlobalLoading = false;
          this.clienteSalvar = new Cliente();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cliente inserido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  alterarCliente() {
    this.clienteService.alterarCliente(this.clienteSalvar).subscribe(
      {
        next: (response: Cliente) => {
          this.listarClientes();
          this.clienteSalvar = new Cliente();
          this.displaySaveBar = false;
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cliente alterado com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  removerCliente(idCliente: string) {
    this.isGlobalLoading = true;
    this.clienteService.removerCliente(idCliente).subscribe(
      {
        next: () => {
          this.listarClientes();
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Cliente removido com sucesso'});
        }, error: () => {
          this.isGlobalLoading = false;
        }
      }
    )
  }

  abreSlideInserir() {
    this.displaySaveBar = true; 
    this.clienteSalvar = new Cliente();
  }

  abreSlideEditar(cliente: Cliente) {
    this.displaySaveBar = true; 
    this.clienteSalvar = {...cliente}
  }

  abreModalExclusao(cliente: Cliente) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo remover a cliente?',
      accept: () => {
          this.removerCliente(cliente.id!)
      }
  });
  }

}
