import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { AdicionalCardapio } from "../model/adicional-cardapio.model";

@Injectable({
    providedIn: 'root'
})
export class AdicionalCardapioService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarAdicionalCardapioPorId(id: string): Observable<AdicionalCardapio> {
        return this.httpClient.get<AdicionalCardapio>(`${this._server}/adicional-cardapio/buscar/${id}`);
    }

    listarAdicionalCardapios(): Observable<ApiCollectionResponse<AdicionalCardapio>> {
        return this.httpClient.get<ApiCollectionResponse<AdicionalCardapio>>(`${this._server}/adicional-cardapio`);
    }

    inserirAdicionalCardapio(adicionalCardapio: AdicionalCardapio): Observable<AdicionalCardapio> {
        return this.httpClient.post<AdicionalCardapio>(`${this._server}/adicional-cardapio/inserir`, adicionalCardapio);
    }

    alterarAdicionalCardapio(adicionalCardapio: AdicionalCardapio): Observable<AdicionalCardapio> {
        return this.httpClient.put<AdicionalCardapio>(`${this._server}/adicional-cardapio/alterar/${adicionalCardapio.id}`, adicionalCardapio);
    }

    removerAdicionalCardapio(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/adicional-cardapio/remover/${id}`);
    }
}