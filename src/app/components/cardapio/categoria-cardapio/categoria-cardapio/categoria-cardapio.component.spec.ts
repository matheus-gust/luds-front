import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCardapioComponent } from './categoria-cardapio.component';

describe('CategoriaCardapioComponent', () => {
  let component: CategoriaCardapioComponent;
  let fixture: ComponentFixture<CategoriaCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaCardapioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
