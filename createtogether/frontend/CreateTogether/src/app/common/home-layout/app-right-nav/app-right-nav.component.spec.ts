import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRightNavComponent } from './app-right-nav.component';

describe('AppRightNavComponent', () => {
  let component: AppRightNavComponent;
  let fixture: ComponentFixture<AppRightNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRightNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRightNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
