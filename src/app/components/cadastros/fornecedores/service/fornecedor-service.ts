import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { Fornecedor } from "../model/fornecedor.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarFornecedorPorId(id: string): Observable<Fornecedor> {
        return this.httpClient.get<Fornecedor>(`${this._server}/fornecedor/buscar/${id}`);
    }

    listarFornecedores(): Observable<ApiCollectionResponse<Fornecedor>> {
        return this.httpClient.get<ApiCollectionResponse<Fornecedor>>(`${this._server}/fornecedor`);
    }

    inserirFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.httpClient.post<Fornecedor>(`${this._server}/fornecedor/inserir`, fornecedor);
    }

    alterarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.httpClient.put<Fornecedor>(`${this._server}/fornecedor/alterar/${fornecedor.id}`, fornecedor);
    }

    removerFornecedor(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/fornecedor/remover/${id}`);
    }
}