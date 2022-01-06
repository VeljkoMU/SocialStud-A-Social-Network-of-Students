import { TestBed } from '@angular/core/testing';

import { UserDataSharedStateService } from './user-data-shared-state.service';

describe('UserDataSharedStateService', () => {
  let service: UserDataSharedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataSharedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
