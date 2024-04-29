import { UnidadeMedida } from "../../unidademedida/model/unidademedida.model";

export class Insumo {
    id: string;
    codigo: string;
    nome: string;
    fornecedor: string;
    localidade: string;
    unidadeMedida: UnidadeMedida;
}