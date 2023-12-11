import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { VariedadeCardapio } from "../model/variedade-cardapio.model";

@Injectable({
    providedIn: 'root'
})
export class VariedadeCardapioService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarVariedadeCardapioPorId(id: string): Observable<VariedadeCardapio> {
        return this.httpClient.get<VariedadeCardapio>(`${this._server}/variedade-cardapio/buscar/${id}`);
    }

    listarVariedadeCardapios(): Observable<ApiCollectionResponse<VariedadeCardapio>> {
        return this.httpClient.get<ApiCollectionResponse<VariedadeCardapio>>(`${this._server}/variedade-cardapio`);
    }

    inserirVariedadeCardapio(variedadeCardapio: VariedadeCardapio): Observable<VariedadeCardapio> {
        return this.httpClient.post<VariedadeCardapio>(`${this._server}/variedade-cardapio/inserir`, variedadeCardapio);
    }

    alterarVariedadeCardapio(variedadeCardapio: VariedadeCardapio): Observable<VariedadeCardapio> {
        return this.httpClient.put<VariedadeCardapio>(`${this._server}/variedade-cardapio/alterar/${variedadeCardapio.id}`, variedadeCardapio);
    }

    removerVariedadeCardapio(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/variedade-cardapio/remover/${id}`);
    }
}