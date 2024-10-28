import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoProductosComponent } from './manejo-productos.component';

describe('ManejoProductosComponent', () => {
  let component: ManejoProductosComponent;
  let fixture: ComponentFixture<ManejoProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManejoProductosComponent]
    });
    fixture = TestBed.createComponent(ManejoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
