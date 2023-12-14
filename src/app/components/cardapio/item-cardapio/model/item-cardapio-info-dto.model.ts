import { CategoriaCardapio } from "../../categoria-cardapio/model/categoria-cardapio.model";
import { VariedadeCardapio } from "../../variedade-cardapio/model/variedade-cardapio.model";

export class ItemCardapioInfoDTO {
    id: string;
    codigo: string;
    nome: string;
    descricao: string;
    variedades: VariedadeCardapio[] = [];
    categoria: CategoriaCardapio;
}