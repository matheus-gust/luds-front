import { CategoriaCardapio } from "src/app/components/cardapio/categoria-cardapio/model/categoria-cardapio.model";
import { ItemCardapio } from "src/app/components/cardapio/item-cardapio/model/item-cardapio.model";
import { VariedadeCardapio } from "src/app/components/cardapio/variedade-cardapio/model/variedade-cardapio.model";

export class VendaItemCardapio {
    id: string;
    boletim: string;
    valor: number;
    item: ItemCardapio;
    variedade: VariedadeCardapio;
    quantidade: number;
}