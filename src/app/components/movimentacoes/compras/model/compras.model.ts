import { CompraInsumo } from "./compras-item-cardapio.model";

export class Compra {
    id: string;
    itens: CompraInsumo[];
    origem: string;
    valor: number;
    data: string;
}