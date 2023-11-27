import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidasComponent } from './unidademedida.component';

describe('UnidadeMedidasComponent', () => {
  let component: UnidadeMedidasComponent;
  let fixture: ComponentFixture<UnidadeMedidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeMedidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
