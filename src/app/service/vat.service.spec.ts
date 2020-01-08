import { TestBed } from '@angular/core/testing';

import { VatService } from './vat.service';

describe('VatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VatService = TestBed.get(VatService);
    expect(service).toBeTruthy();
  });
});
