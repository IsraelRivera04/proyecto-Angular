import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementosListComponent } from './complementos-list.component';

describe('ComplementosListComponent', () => {
  let component: ComplementosListComponent;
  let fixture: ComponentFixture<ComplementosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
