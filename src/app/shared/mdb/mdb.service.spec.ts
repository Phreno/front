import { TestBed } from '@angular/core/testing';

import { MdbService } from './mdb.service';

describe('MdbService', () => {
  let service: MdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
