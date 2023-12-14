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

    lounchMesage() {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os campos obrigatórios' });
    }
    validaFormularioInsercao(form: NgForm, formId: string) {
        if (form.form.valid) {
            return form.form.valid;
        } else {
            this.lounchMesage();
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os campos obrigatórios' });
            const formulario: HTMLFormElement | null = document.getElementById(formId) as HTMLFormElement | null;
            if (formulario) {
                var elementosDoFormulario: HTMLFormControlsCollection = formulario.elements;
                for (var i = 0; i < elementosDoFormulario.length; i++) {
                    var elemento: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement = elementosDoFormulario[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

                    // Adicione as classes apenas se o elemento for um campo de formulário
                    if (elemento.tagName.toLowerCase() === 'input' || elemento.tagName.toLowerCase() === 'textarea' || elemento.tagName.toLowerCase() === 'select') {
                        // Adicione a classe ng-dirty
                        elemento.classList.add('ng-dirty');

                        // Adicione a classe ng-invalid se o campo estiver inválido
                        if (elemento.validity && !elemento.validity.valid) {
                            elemento.classList.add('ng-invalid');
                        }
                    }
                }
            }
            return false;
        }
    }
}