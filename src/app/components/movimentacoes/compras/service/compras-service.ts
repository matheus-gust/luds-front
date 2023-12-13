import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { Compra } from "../model/compras.model";

@Injectable({
    providedIn: 'root'
})
export class CompraService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarCompraPorId(id: string): Observable<Compra> {
        return this.httpClient.get<Compra>(`${this._server}/compra/buscar/${id}`);
    }

    listarCompras(): Observable<ApiCollectionResponse<Compra>> {
        return this.httpClient.get<ApiCollectionResponse<Compra>>(`${this._server}/compra`);
    }

    inserirCompra(compra: Compra): Observable<Compra> {
        return this.httpClient.post<Compra>(`${this._server}/compra/inserir`, compra);
    }

    alterarCompra(compra: Compra): Observable<Compra> {
        return this.httpClient.put<Compra>(`${this._server}/compra/alterar/${compra.id}`, compra);
    }

    removerCompra(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/compra/remover/${id}`);
    }
}