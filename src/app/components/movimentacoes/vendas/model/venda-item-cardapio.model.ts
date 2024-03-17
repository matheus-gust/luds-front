import { ItemCardapioVariedade } from "src/app/components/cardapio/item-cardapio/model/item-cardapio-variedade.model";
import { ItemCardapio } from "src/app/components/cardapio/item-cardapio/model/item-cardapio.model";
import { Parte } from "./partes.model";

export class VendaItemCardapio {
    id: string;
    boletim: string;
    valor: number = 0;
    item: ItemCardapio;
    variedade: ItemCardapioVariedade = new ItemCardapioVariedade();
    quantidade: number;
    parte: Parte;
}