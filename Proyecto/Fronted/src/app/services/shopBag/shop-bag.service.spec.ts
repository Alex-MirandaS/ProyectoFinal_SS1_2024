import { TestBed } from '@angular/core/testing';

import { ShopBagService } from './shop-bag.service';

describe('ShopBagService', () => {
  let service: ShopBagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopBagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
