import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-loading',
  templateUrl: './generic-loading.component.html',
  styleUrls: ['./generic-loading.component.css']
})
export class GenericLoadingComponent implements OnInit {

  @Input() visible: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
