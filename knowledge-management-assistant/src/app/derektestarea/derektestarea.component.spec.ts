import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerektestareaComponent } from './derektestarea.component';

describe('DerektestareaComponent', () => {
  let component: DerektestareaComponent;
  let fixture: ComponentFixture<DerektestareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DerektestareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerektestareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
