import { TestBed } from '@angular/core/testing';

import { CarListPageService } from './car-list-page.service';

describe('CarListPageService', () => {
  let service: CarListPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarListPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
