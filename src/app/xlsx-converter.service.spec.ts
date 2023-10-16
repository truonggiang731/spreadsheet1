import { TestBed } from '@angular/core/testing';

import { XlsxConverterService } from './xlsx-converter.service';

describe('XlsxConverterService', () => {
  let service: XlsxConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsxConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
