import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBagComponent } from './shop-bag.component';

describe('ShopBagComponent', () => {
  let component: ShopBagComponent;
  let fixture: ComponentFixture<ShopBagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopBagComponent]
    });
    fixture = TestBed.createComponent(ShopBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
