import { VariedadeCardapio } from "../../variedade-cardapio/model/variedade-cardapio.model";
import { ItemCardapio } from "./item-cardapio.model";

export class ItemCardapioVariedade {
    id: string;
    item: ItemCardapio;
    variedade: VariedadeCardapio;
    valor: number;
}