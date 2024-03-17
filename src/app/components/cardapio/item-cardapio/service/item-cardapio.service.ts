import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { ItemCardapio } from "../model/item-cardapio.model";
import { ItemCardapioInfoDTO } from "../model/item-cardapio-info-dto.model";

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
        let params = new HttpParams();
        params = params.append('pageSize', 1000);
        return this.httpClient.get<ApiCollectionResponse<ItemCardapio>>(`${this._server}/item-cardapio`, {params});
    }

    listarItensCardapioInfo(): Observable<ApiCollectionResponse<ItemCardapioInfoDTO>> {
        return this.httpClient.get<ApiCollectionResponse<ItemCardapioInfoDTO>>(`${this._server}/item-cardapio/info`);
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