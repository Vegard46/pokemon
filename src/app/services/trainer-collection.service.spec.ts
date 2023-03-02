import { TestBed } from '@angular/core/testing';

import { TrainerCollectionService } from './trainer-collection.service';

describe('TrainerCollectionService', () => {
  let service: TrainerCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
