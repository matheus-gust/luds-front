import { CategoriaCardapio } from "../../categoria-cardapio/model/categoria-cardapio.model";
import { ItemCardapioVariedade } from "./item-cardapio-variedade.model";

export class ItemCardapio {
    id: string;
    codigo: string;
    nome: string;
    descricao: string;
    valor: number;
    tamanho: string;
    categoria: CategoriaCardapio;
    imagem: string;
    variedades: ItemCardapioVariedade[] = [];
}