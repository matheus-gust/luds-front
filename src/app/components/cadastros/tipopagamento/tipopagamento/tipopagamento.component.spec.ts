import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagamentosComponent } from './tipopagamento.component';

describe('TipoPagamentosComponent', () => {
  let component: TipoPagamentosComponent;
  let fixture: ComponentFixture<TipoPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
