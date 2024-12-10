import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaManoDetailComponent } from './segunda-mano-detail.component';

describe('SegundaManoDetailComponent', () => {
  let component: SegundaManoDetailComponent;
  let fixture: ComponentFixture<SegundaManoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundaManoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundaManoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
