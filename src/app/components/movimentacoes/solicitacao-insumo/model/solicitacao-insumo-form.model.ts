import { SolicitacaoInsumo } from "./solicitacao-insumo.model";

export class SolicitacaoInsumoForm {
    id: string;
    quantidadeSolicitada: number;
    insumo: string;
    unidade: string;

    constructor(solicitacaoInsumo: SolicitacaoInsumo) {
        this.id = solicitacaoInsumo.id;
        this.quantidadeSolicitada = solicitacaoInsumo.quantidadeSolicitada;
        this.insumo = solicitacaoInsumo.insumo.id;
        this.unidade = solicitacaoInsumo.unidade.id;
    }
}