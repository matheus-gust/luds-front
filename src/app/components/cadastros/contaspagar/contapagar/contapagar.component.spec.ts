import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPagarsComponent } from './contapagar.component';

describe('ContaPagarsComponent', () => {
  let component: ContaPagarsComponent;
  let fixture: ComponentFixture<ContaPagarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaPagarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaPagarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
