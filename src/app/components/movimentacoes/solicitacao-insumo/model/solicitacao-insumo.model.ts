import { Insumo } from "src/app/components/cadastros/insumos/model/insumo.model";
import { Unidade } from "src/app/components/cadastros/unidade/model/unidade.model";

export class SolicitacaoInsumo {
    id: string;
    quantidadeSolicitada: number;
    insumo: Insumo;
    unidade: Unidade;
}