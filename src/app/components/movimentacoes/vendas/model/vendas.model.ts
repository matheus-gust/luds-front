import { Parte } from "./partes.model";

export class Venda {
    id: string;
    origem: string;
    valor: number = 0;
    data: Date;
    mesa: number;
    responsavel: string;
    partes: Parte[] = [];
}