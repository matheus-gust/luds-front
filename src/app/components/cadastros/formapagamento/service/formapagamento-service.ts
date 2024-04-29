import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { FormaPagamento } from "../model/formapagamento.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FormaPagamentoService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarFormaPagamentoPorId(id: string): Observable<FormaPagamento> {
        return this.httpClient.get<FormaPagamento>(`${this._server}/forma-pagamento/buscar/${id}`);
    }

    listarFormaPagamentos(): Observable<ApiCollectionResponse<FormaPagamento>> {
        return this.httpClient.get<ApiCollectionResponse<FormaPagamento>>(`${this._server}/forma-pagamento`);
    }

    inserirFormaPagamento(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
        return this.httpClient.post<FormaPagamento>(`${this._server}/forma-pagamento/inserir`, formaPagamento);
    }

    alterarFormaPagamento(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
        return this.httpClient.put<FormaPagamento>(`${this._server}/forma-pagamento/alterar/${formaPagamento.id}`, formaPagamento);
    }

    removerFormaPagamento(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/forma-pagamento/remover/${id}`);
    }
}