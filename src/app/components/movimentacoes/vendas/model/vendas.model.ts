import { VendaItemCardapio } from "./venda-item-cardapio.model";

export class Venda {
    id: string;
    origem: string;
    valor: number = 0;
    data: Date;
    mesa: number;
    responsavel: string;
}