import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialViewComponent } from './social-view.component';

describe('SocialViewComponent', () => {
  let component: SocialViewComponent;
  let fixture: ComponentFixture<SocialViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
