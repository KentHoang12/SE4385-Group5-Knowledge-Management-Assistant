import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsearchComponent } from './websearch.component';

describe('WebsearchComponent', () => {
  let component: WebsearchComponent;
  let fixture: ComponentFixture<WebsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
