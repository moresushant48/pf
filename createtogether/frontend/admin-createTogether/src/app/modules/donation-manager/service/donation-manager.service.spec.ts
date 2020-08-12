import { TestBed } from '@angular/core/testing';

import { DonationManagerServiceService } from './donation-manager-service.service';

describe('DonationManagerServiceService', () => {
  let service: DonationManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
