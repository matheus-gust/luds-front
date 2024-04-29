import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { TipoPagamento } from "../model/tipopagamento.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TipoPagamentoService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarTipoPagamentoPorId(id: string): Observable<TipoPagamento> {
        return this.httpClient.get<TipoPagamento>(`${this._server}/tipo-pagamento/buscar/${id}`);
    }

    listarTipoPagamentos(): Observable<ApiCollectionResponse<TipoPagamento>> {
        return this.httpClient.get<ApiCollectionResponse<TipoPagamento>>(`${this._server}/tipo-pagamento`);
    }

    inserirTipoPagamento(tipoPagamento: TipoPagamento): Observable<TipoPagamento> {
        return this.httpClient.post<TipoPagamento>(`${this._server}/tipo-pagamento/inserir`, tipoPagamento);
    }

    alterarTipoPagamento(tipoPagamento: TipoPagamento): Observable<TipoPagamento> {
        return this.httpClient.put<TipoPagamento>(`${this._server}/tipo-pagamento/alterar/${tipoPagamento.id}`, tipoPagamento);
    }

    removerTipoPagamento(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/tipo-pagamento/remover/${id}`);
    }
}