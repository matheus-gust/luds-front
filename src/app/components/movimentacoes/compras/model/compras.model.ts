import { Fornecedor } from "src/app/components/cadastros/fornecedores/model/fornecedor.model";
import { CompraInsumo } from "./compras-item-cardapio.model";

export class Compra {
    id: string;
    itens: CompraInsumo[] = [];
    fornecedor: Fornecedor;
    valorTotal: number = 0;
    data: string;
}