import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { Cliente } from "../model/cliente.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarClientePorId(id: string): Observable<Cliente> {
        return this.httpClient.get<Cliente>(`${this._server}/cliente/buscar/${id}`);
    }

    listarClientes(): Observable<ApiCollectionResponse<Cliente>> {
        return this.httpClient.get<ApiCollectionResponse<Cliente>>(`${this._server}/cliente`);
    }

    inserirCliente(cliente: Cliente): Observable<Cliente> {
        return this.httpClient.post<Cliente>(`${this._server}/cliente/inserir`, cliente);
    }

    alterarCliente(cliente: Cliente): Observable<Cliente> {
        return this.httpClient.put<Cliente>(`${this._server}/cliente/alterar/${cliente.id}`, cliente);
    }

    removerCliente(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/cliente/remover/${id}`);
    }
}