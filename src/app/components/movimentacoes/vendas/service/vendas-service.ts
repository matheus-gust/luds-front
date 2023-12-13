import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { environment } from "src/environments/environment";
import { Venda } from "../model/vendas.model";

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarVendaPorId(id: string): Observable<Venda> {
        return this.httpClient.get<Venda>(`${this._server}/venda/buscar/${id}`);
    }

    listarVendas(): Observable<ApiCollectionResponse<Venda>> {
        return this.httpClient.get<ApiCollectionResponse<Venda>>(`${this._server}/venda`);
    }

    inserirVenda(venda: Venda): Observable<Venda> {
        return this.httpClient.post<Venda>(`${this._server}/venda/inserir`, venda);
    }

    alterarVenda(venda: Venda): Observable<Venda> {
        return this.httpClient.put<Venda>(`${this._server}/venda/alterar/${venda.id}`, venda);
    }

    removerVenda(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/venda/remover/${id}`);
    }
}