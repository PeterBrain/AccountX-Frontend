import { TestBed } from '@angular/core/testing';

import { BookingTypeService } from './booking-type.service';

describe('BookingTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingTypeService = TestBed.get(BookingTypeService);
    expect(service).toBeTruthy();
  });
});
