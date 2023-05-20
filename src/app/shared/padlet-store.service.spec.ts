import { TestBed } from '@angular/core/testing';

import { PadletStoreService } from './padlet-store.service';

describe('PadletStoreService', () => {
  let service: PadletStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadletStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
