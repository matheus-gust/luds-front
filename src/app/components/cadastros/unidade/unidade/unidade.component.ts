import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;

  unidades = [
    {
     nome: "Lud's Matriz",
     localidade: "Assis/SP",
     cnpj: "123456789"
    },
    {
      nome: "Lud's Distribuidora",
      localidade: "Assis/SP",
      cnpj: "123456789"
     },
     {
      nome: "Lud's Araçatuba",
      localidade: "Araçatuba/SP",
      cnpj: "123456789"
     },
     {
      nome: "Lud's Londrina",
      localidade: "Londrina/PR",
      cnpj: "123456789"
     }
  ]

  home: MenuItem = {};

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Unidades' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
