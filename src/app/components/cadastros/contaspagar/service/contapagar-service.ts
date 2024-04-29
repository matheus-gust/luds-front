import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { ContaPagar } from "../model/contapagar.model";
import { environment } from "src/environments/environment";
import { FormaPagamento } from "../../formapagamento/model/formapagamento.model";

@Injectable({
    providedIn: 'root'
})
export class ContaPagarService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarContaPagarPorId(id: string): Observable<ContaPagar> {
        return this.httpClient.get<ContaPagar>(`${this._server}/conta-pagar/buscar/${id}`);
    }

    listarContaPagars(): Observable<ApiCollectionResponse<ContaPagar>> {
        return this.httpClient.get<ApiCollectionResponse<ContaPagar>>(`${this._server}/conta-pagar`);
    }

    inserirContaPagar(contaPagar: ContaPagar): Observable<ContaPagar> {
        return this.httpClient.post<ContaPagar>(`${this._server}/conta-pagar/inserir`, contaPagar);
    }

    alterarContaPagar(contaPagar: ContaPagar): Observable<ContaPagar> {
        return this.httpClient.put<ContaPagar>(`${this._server}/conta-pagar/alterar/${contaPagar.id}`, contaPagar);
    }

    removerContaPagar(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/conta-pagar/remover/${id}`);
    }
    
    marcaContaPago(idConta: string, formaPagamento: FormaPagamento): Observable<void> {
        return this.httpClient.patch<void>(`${this._server}/conta-pagar/marca-pago/${idConta}`, {formaPagamento: formaPagamento});
    }
}