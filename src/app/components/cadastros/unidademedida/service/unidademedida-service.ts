import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { UnidadeMedida } from "../model/unidademedida.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UnidadeMedidaService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarUnidadeMedidaPorId(id: string): Observable<UnidadeMedida> {
        return this.httpClient.get<UnidadeMedida>(`${this._server}/unidade-medida/buscar/${id}`);
    }

    listarUnidadeMedidas(): Observable<ApiCollectionResponse<UnidadeMedida>> {
        return this.httpClient.get<ApiCollectionResponse<UnidadeMedida>>(`${this._server}/unidade-medida`);
    }

    inserirUnidadeMedida(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
        return this.httpClient.post<UnidadeMedida>(`${this._server}/unidade-medida/inserir`, unidadeMedida);
    }

    alterarUnidadeMedida(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
        return this.httpClient.put<UnidadeMedida>(`${this._server}/unidade-medida/alterar/${unidadeMedida.id}`, unidadeMedida);
    }

    removerUnidadeMedida(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/unidade-medida/remover/${id}`);
    }
}