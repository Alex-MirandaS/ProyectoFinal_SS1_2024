import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPasarelaComponent } from './login-pasarela.component';

describe('LoginPasarelaComponent', () => {
  let component: LoginPasarelaComponent;
  let fixture: ComponentFixture<LoginPasarelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPasarelaComponent]
    });
    fixture = TestBed.createComponent(LoginPasarelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
