import { Fornecedor } from "src/app/components/cadastros/fornecedores/model/fornecedor.model";
import { CompraInsumo } from "./compras-item-cardapio.model";
import { FormaPagamento } from "src/app/components/cadastros/formapagamento/model/formapagamento.model";
import { TipoPagamento } from "src/app/components/cadastros/tipopagamento/model/tipopagamento.model";

export class Compra {
    id: string;
    itens: CompraInsumo[] = [];
    fornecedor: Fornecedor;
    valorTotal: number = 0;
    data: string;
    formaPagamento: FormaPagamento;
}