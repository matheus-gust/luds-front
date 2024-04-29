import { Injectable, Input } from "@angular/core";

@Injectable()
export class BaseComponent {
    @Input() hospedeiro: boolean;

    constructor() {
        
    }
}