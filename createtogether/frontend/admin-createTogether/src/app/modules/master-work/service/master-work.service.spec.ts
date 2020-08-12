import { TestBed } from '@angular/core/testing';

import { MasterWorkService } from './master-work.service';

describe('MasterWorkService', () => {
  let service: MasterWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
