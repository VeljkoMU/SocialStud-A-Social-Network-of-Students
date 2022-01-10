import { TestBed } from '@angular/core/testing';

import { SelectedProfileSharedService } from './selected-profile-shared.service';

describe('SelectedProfileSharedService', () => {
  let service: SelectedProfileSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedProfileSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
