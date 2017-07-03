import { TestBed, inject } from '@angular/core/testing';

import { DashboardAuthService } from './dashboard-auth.service';

describe('DashboardAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardAuthService]
    });
  });

  it('should be created', inject([DashboardAuthService], (service: DashboardAuthService) => {
    expect(service).toBeTruthy();
  }));
});
