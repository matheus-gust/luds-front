import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  items: MenuItem[] = [];
  display: boolean = false;
  home: MenuItem = {};

  insumos = [
    {
      nome: "Calabresa",
      fornecedor: "SEARA",
      valorCusto: "R$ 10,50 / KG",
      valorVenda: "R$ 15,50 / KG"
    },
    {
      nome: "Morango",
      fornecedor: "AURORA",
      valorCusto: "R$ 9,50 / PCT",
      valorVenda: "R$ 12,99 / PCT"
    },
    {
      nome: "Muçarela",
      fornecedor: "ANDORINHA",
      valorCusto: "R$ 36,99 / KG",
      valorVenda: "R$ 45,99 / KG"
    }
  ]

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Cadastros' },
      { label: 'Insumos' }
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
