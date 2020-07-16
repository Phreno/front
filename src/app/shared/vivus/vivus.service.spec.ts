import { TestBed } from '@angular/core/testing';

import { VivusService } from './vivus.service';

describe('VivusService', () => {
  let service: VivusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
