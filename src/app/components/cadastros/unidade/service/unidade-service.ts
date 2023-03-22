import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Unidade } from "../model/unidade.model";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";

@Injectable({
    providedIn: 'root'
})
export class UnidadeService {

    _server: string = 'http://127.0.0.1:8080'

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarUnidadePorId(id: string): Observable<Unidade> {
        return this.httpClient.get<Unidade>(`${this._server}/unidade/buscar/${id}`);
    }

    listarUnidades(): Observable<ApiCollectionResponse<Unidade>> {
        return this.httpClient.get<ApiCollectionResponse<Unidade>>(`${this._server}/unidade`);
    }

    inserirUnidade(unidade: Unidade): Observable<Unidade> {
        return this.httpClient.post<Unidade>(`${this._server}/unidade/inserir`, unidade);
    }

    alterarUnidade(unidade: Unidade): Observable<Unidade> {
        return this.httpClient.put<Unidade>(`${this._server}/unidade/alterar/${unidade.id}`, unidade);
    }

    removerUnidade(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/unidade/remover/${id}`);
    }
}