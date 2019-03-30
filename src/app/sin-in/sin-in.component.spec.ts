import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinInComponent } from './sin-in.component';

describe('SinInComponent', () => {
  let component: SinInComponent;
  let fixture: ComponentFixture<SinInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
