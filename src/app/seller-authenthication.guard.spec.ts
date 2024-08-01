import { TestBed } from '@angular/core/testing';

import { SellerAuthenthicationGuard } from './seller-authenthication.guard';

describe('SellerAuthenthicationGuard', () => {
  let guard: SellerAuthenthicationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerAuthenthicationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
