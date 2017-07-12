import { TestBed, inject } from '@angular/core/testing';

import { DashboardHttpService } from './dashboard-http.service';

describe('DashboardHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardHttpService]
    });
  });

  it('should be created', inject([DashboardHttpService], (service: DashboardHttpService) => {
    expect(service).toBeTruthy();
  }));
});
