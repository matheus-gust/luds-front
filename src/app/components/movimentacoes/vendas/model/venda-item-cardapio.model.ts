import { ItemCardapioVariedade } from "src/app/components/cardapio/item-cardapio/model/item-cardapio-variedade.model";
import { ItemCardapio } from "src/app/components/cardapio/item-cardapio/model/item-cardapio.model";

export class VendaItemCardapio {
    id: string;
    boletim: string;
    valor: number = 0;
    item: ItemCardapio;
    variedade: ItemCardapioVariedade;
    quantidade: number;
    parte: string;
}