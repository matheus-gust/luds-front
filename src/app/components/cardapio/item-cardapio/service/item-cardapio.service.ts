import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { ItemCardapio } from "../model/item-cardapio.model";

@Injectable({
    providedIn: 'root'
})
export class ItemCardapioService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarItemCardapioPorId(id: string): Observable<ItemCardapio> {
        return this.httpClient.get<ItemCardapio>(`${this._server}/item-cardapio/buscar/${id}`);
    }

    listarItensCardapio(): Observable<ApiCollectionResponse<ItemCardapio>> {
        return this.httpClient.get<ApiCollectionResponse<ItemCardapio>>(`${this._server}/item-cardapio`);
    }

    inserirItemCardapio(itemCardapio: ItemCardapio): Observable<ItemCardapio> {
        return this.httpClient.post<ItemCardapio>(`${this._server}/item-cardapio/inserir`, itemCardapio);
    }

    alterarItemCardapio(itemCardapio: ItemCardapio): Observable<ItemCardapio> {
        return this.httpClient.put<ItemCardapio>(`${this._server}/item-cardapio/alterar/${itemCardapio.id}`, itemCardapio);
    }

    removerItemCardapio(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/item-cardapio/remover/${id}`);
    }
}