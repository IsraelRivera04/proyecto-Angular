import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementosDetailComponent } from './complementos-detail.component';

describe('ComplementosDetailComponent', () => {
  let component: ComplementosDetailComponent;
  let fixture: ComponentFixture<ComplementosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementosDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
