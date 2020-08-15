import { Component, OnInit } from '@angular/core';
import { GuildsService } from '../services/guilds.service';
import { SEOService } from '../services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-guild-page',
  templateUrl: './guild-page.component.html',
  styleUrls: ['./guild-page.component.css']
})
export class GuildPageComponent implements OnInit {
  guild: any;
  user: any;

  get id() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    private service: GuildsService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.service.init();

    this.user = this.service.getGuild(this.id);
    this.guild = this.service.getSavedGuild(this.id);
    if (!this.user || !this.guild)
      return this.router.navigate(['']);

    this.seo.setTags({
      description: this.guild.listing.overview,
      titlePrefix: this.user.username,
      titleSuffix: 'DList',
      url: `guilds/${this.id}`
    });
  }

  async approve(reason: string) {   
    if (reason.length < 50) return;

    await this.service.approveGuild(this.id, reason);

    this.router.navigate(['/dashboard']);
  }
  async decline(reason: string) {
    if (reason.length < 50) return;

    await this.service.declineGuild(this.id, reason);

    this.router.navigate(['/dashboard']);
  }
}
