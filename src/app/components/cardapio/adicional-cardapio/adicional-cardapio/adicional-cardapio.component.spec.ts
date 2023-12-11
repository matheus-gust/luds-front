import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionalCardapioComponent } from './adicional-cardapio.component';

describe('AdicionalCardapioComponent', () => {
  let component: AdicionalCardapioComponent;
  let fixture: ComponentFixture<AdicionalCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionalCardapioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionalCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
