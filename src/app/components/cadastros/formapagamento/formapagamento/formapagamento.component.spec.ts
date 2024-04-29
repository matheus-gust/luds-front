import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentosComponent } from './formapagamento.component';

describe('FormaPagamentosComponent', () => {
  let component: FormaPagamentosComponent;
  let fixture: ComponentFixture<FormaPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
