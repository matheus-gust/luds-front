import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariedadeCardapioComponent } from './variedade-cardapio.component';

describe('VariedadeCardapioComponent', () => {
  let component: VariedadeCardapioComponent;
  let fixture: ComponentFixture<VariedadeCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariedadeCardapioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariedadeCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
