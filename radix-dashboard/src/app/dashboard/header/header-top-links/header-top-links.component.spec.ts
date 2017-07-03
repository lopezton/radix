import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopLinksComponent } from './header-top-links.component';

describe('HeaderTopLinksComponent', () => {
  let component: HeaderTopLinksComponent;
  let fixture: ComponentFixture<HeaderTopLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTopLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTopLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
