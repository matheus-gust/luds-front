import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { Categoria } from "../model/categoria.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarCategoriaPorId(id: string): Observable<Categoria> {
        return this.httpClient.get<Categoria>(`${this._server}/categoria/buscar/${id}`);
    }

    listarCategorias(): Observable<ApiCollectionResponse<Categoria>> {
        return this.httpClient.get<ApiCollectionResponse<Categoria>>(`${this._server}/categoria`);
    }

    inserirCategoria(categoria: Categoria): Observable<Categoria> {
        return this.httpClient.post<Categoria>(`${this._server}/categoria/inserir`, categoria);
    }

    alterarCategoria(categoria: Categoria): Observable<Categoria> {
        return this.httpClient.put<Categoria>(`${this._server}/categoria/alterar/${categoria.id}`, categoria);
    }

    removerCategoria(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/categoria/remover/${id}`);
    }
}