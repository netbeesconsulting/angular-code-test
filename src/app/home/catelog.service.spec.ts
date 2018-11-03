import { TestBed } from '@angular/core/testing';

import { CatelogService } from './catelog.service';

describe('CatelogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatelogService = TestBed.get(CatelogService);
    expect(service).toBeTruthy();
  });
});
