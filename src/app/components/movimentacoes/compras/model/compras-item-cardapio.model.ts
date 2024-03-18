import { UnidadeMedida } from "src/app/components/cadastros/unidademedida/model/unidademedida.model";
import { Compra } from "./compras.model";
import { Insumo } from "src/app/components/cadastros/insumos/model/insumo.model";

export class CompraInsumo {
    id: string;
    compra: Compra;
    insumo: Insumo;
    quantidade: number = 0;
    valor: number = 0;
    desconto: number = 0;
}