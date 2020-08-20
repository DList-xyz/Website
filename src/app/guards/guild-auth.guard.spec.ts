import { TestBed } from '@angular/core/testing';

import { GuildAuthGuard } from './guild-auth.guard';

describe('GuildAuthGuard', () => {
  let guard: GuildAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuildAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('user does not own guild, returns false', () => {
    const result = guard.canActivate({
      paramMap: new Map().set('id', '525935335918665761')
    } as any);

    expect(result).toBeFalse();
  });

  it('user owns guild, returns true', () => {
    const result = guard.canActivate({
      paramMap: new Map().set('id', '525935335918665760')
    } as any);

    expect(result).toBeTrue();
  });
});
