import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraFinalizarComponent } from './compra-finalizar.component';

describe('CompraFinalizarComponent', () => {
  let component: CompraFinalizarComponent;
  let fixture: ComponentFixture<CompraFinalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraFinalizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
