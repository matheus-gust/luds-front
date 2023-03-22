import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoInsumoComponent } from './solicitacao-insumo.component';

describe('SolicitacaoInsumoComponent', () => {
  let component: SolicitacaoInsumoComponent;
  let fixture: ComponentFixture<SolicitacaoInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoInsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
