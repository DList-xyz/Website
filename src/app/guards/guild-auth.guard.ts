import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { GuildsService } from '../services/guilds.service';

@Injectable({ providedIn: 'root' })
export class GuildAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: GuildsService) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    await this.service.init();

    const id = next.paramMap.get('id');
    const ownsGuild = this.service.userGuilds?.some(g => g.id === id);
    if (!ownsGuild)
      this.router.navigate(['/dashboard']);
    return true;
  }  
}
