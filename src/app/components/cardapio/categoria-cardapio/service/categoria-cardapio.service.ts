import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { CategoriaCardapio } from "../model/categoria-cardapio.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaCardapioService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarCategoriaCardapioPorId(id: string): Observable<CategoriaCardapio> {
        return this.httpClient.get<CategoriaCardapio>(`${this._server}/categoria-cardapio/buscar/${id}`);
    }

    listarCategoriaCardapios(): Observable<ApiCollectionResponse<CategoriaCardapio>> {
        return this.httpClient.get<ApiCollectionResponse<CategoriaCardapio>>(`${this._server}/categoria-cardapio`);
    }

    inserirCategoriaCardapio(categoriaCardapio: CategoriaCardapio): Observable<CategoriaCardapio> {
        return this.httpClient.post<CategoriaCardapio>(`${this._server}/categoria-cardapio/inserir`, categoriaCardapio);
    }

    alterarCategoriaCardapio(categoriaCardapio: CategoriaCardapio): Observable<CategoriaCardapio> {
        return this.httpClient.put<CategoriaCardapio>(`${this._server}/categoria-cardapio/alterar/${categoriaCardapio.id}`, categoriaCardapio);
    }

    removerCategoriaCardapio(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/categoria-cardapio/remover/${id}`);
    }
}