import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaManoListComponent } from './segunda-mano-list.component';

describe('SegundaManoListComponent', () => {
  let component: SegundaManoListComponent;
  let fixture: ComponentFixture<SegundaManoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundaManoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundaManoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
