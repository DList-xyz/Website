import { TestBed } from '@angular/core/testing';

import { GuildsService } from './guilds.service';

describe('GuildsService', () => {
  let service: GuildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
