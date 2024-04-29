import { VendaItemCardapio } from "./venda-item-cardapio.model";

export class Parte {
    id: string;
    nome: string;
    valorParte: number;
    itens: VendaItemCardapio[] = [];    
}