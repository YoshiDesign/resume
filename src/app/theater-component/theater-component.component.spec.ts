import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterComponentComponent } from './theater-component.component';

describe('TheaterComponentComponent', () => {
  let component: TheaterComponentComponent;
  let fixture: ComponentFixture<TheaterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
