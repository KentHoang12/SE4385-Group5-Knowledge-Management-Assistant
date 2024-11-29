import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpbComponent } from './loginpb.component';

describe('LoginpbComponent', () => {
  let component: LoginpbComponent;
  let fixture: ComponentFixture<LoginpbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
