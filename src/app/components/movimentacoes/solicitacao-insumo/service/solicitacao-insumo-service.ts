import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SolicitacaoInsumo } from "../model/solicitacao-insumo.model";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { SolicitacaoInsumoForm } from "../model/solicitacao-insumo-form.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoInsumoService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarSolicitacaoInsumoPorId(id: string): Observable<SolicitacaoInsumo> {
        return this.httpClient.get<SolicitacaoInsumo>(`${this._server}/solicitacao-insumo/buscar/${id}`);
    }

    listarSolicitacaoInsumos(): Observable<ApiCollectionResponse<SolicitacaoInsumo>> {
        return this.httpClient.get<ApiCollectionResponse<SolicitacaoInsumo>>(`${this._server}/solicitacao-insumo`);
    }

    inserirSolicitacaoInsumo(solicitacaoInsumo: SolicitacaoInsumo): Observable<SolicitacaoInsumo> {
        let solicitacao = new SolicitacaoInsumoForm(solicitacaoInsumo);
        return this.httpClient.post<SolicitacaoInsumo>(`${this._server}/solicitacao-insumo/inserir`, solicitacao);
    }

    alterarSolicitacaoInsumo(solicitacaoInsumo: SolicitacaoInsumo): Observable<SolicitacaoInsumo> {
        let solicitacao = new SolicitacaoInsumoForm(solicitacaoInsumo);
        return this.httpClient.put<SolicitacaoInsumo>(`${this._server}/solicitacao-insumo/alterar/${solicitacaoInsumo.id}`, solicitacao);
    }

    removerSolicitacaoInsumo(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/solicitacao-insumo/remover/${id}`);
    }
}