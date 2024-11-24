import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenAreaComponent } from './citizen-area.component';

describe('CitizenAreaComponent', () => {
  let component: CitizenAreaComponent;
  let fixture: ComponentFixture<CitizenAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
