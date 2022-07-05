import { TestBed } from '@angular/core/testing';

import { PetFormService } from './pet-form.service';

describe('PetFormService', () => {
  let service: PetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
