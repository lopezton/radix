import { TestBed, inject } from '@angular/core/testing';

import { EverestService } from './everest.service';

describe('EverestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EverestService]
    });
  });

  it('should be created', inject([EverestService], (service: EverestService) => {
    expect(service).toBeTruthy();
  }));
});
