import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class FormValidService {

    constructor(
        private messageService: MessageService
    ) { }


    validaFormularioInsercao(formulario: NgForm, formId: string) {
        if (formulario.form.valid) {
            return formulario.form.valid;
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os campos obrigatórios' });
            document.getElementById(formId)?.classList.add('ng-invalid ng-dirty');
            return false;
        }
    }
}