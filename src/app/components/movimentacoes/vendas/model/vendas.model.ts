import { VendaItemCardapio } from "./venda-item-cardapio.model";

export class Venda {
    id: string;
    itens: VendaItemCardapio[] = [];
    origem: string;
    valor: number = 0;
    data: string;
}