import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status >= 500) {
                        this.messageService.add({severity:'error', summary:'Erro', detail:'Falha interna de Servidor'});
                        return throwError(() => error.error.message);
                    }
                    this.messageService.add({severity:'error', summary:error.error.msg, detail:error.error.message});
                    return throwError(() => error.error.message);
                })
            )
    }
}


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})


export class Interceptor { }
