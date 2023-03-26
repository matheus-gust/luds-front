import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiCollectionResponse } from "src/app/commons/api-collection-response.model";
import { Insumo } from "../model/insumo.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class InsumoService {

    _server: string = environment.urlBackEnd;

    constructor(
        private httpClient: HttpClient
    ) { 

    }

    buscarInsumoPorId(id: string): Observable<Insumo> {
        return this.httpClient.get<Insumo>(`${this._server}/insumo/buscar/${id}`);
    }

    listarInsumos(): Observable<ApiCollectionResponse<Insumo>> {
        return this.httpClient.get<ApiCollectionResponse<Insumo>>(`${this._server}/insumo`);
    }

    inserirInsumo(insumo: Insumo): Observable<Insumo> {
        return this.httpClient.post<Insumo>(`${this._server}/insumo/inserir`, insumo);
    }

    alterarInsumo(insumo: Insumo): Observable<Insumo> {
        return this.httpClient.put<Insumo>(`${this._server}/insumo/alterar/${insumo.id}`, insumo);
    }

    removerInsumo(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this._server}/insumo/remover/${id}`);
    }
}