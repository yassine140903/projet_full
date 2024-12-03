import { TestBed } from '@angular/core/testing';

import { ArticledatapassService } from './articledatapass.service';

describe('ArticledatapassService', () => {
  let service: ArticledatapassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticledatapassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
