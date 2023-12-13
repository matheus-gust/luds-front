import { UnidadeMedida } from "src/app/components/cadastros/unidademedida/model/unidademedida.model";

export class CompraInsumo {
    id: string;
    codigo: string;
    nome: string;
    unidadeMedida: UnidadeMedida;
    valor: number;
    quantidade: number;
}