import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { GuildsService } from '../services/guilds.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guild-vote',
  templateUrl: './guild-vote.component.html',
  styleUrls: ['./guild-vote.component.css']
})
export class GuildVoteComponent implements OnInit {
  guild: any;
  savedGuild: any;

  get widgetURL() { return `${environment.endpoint}/guilds/${this.id}/widget?size=medium`; }
  get id() { return this.route.snapshot.paramMap.get('id'); }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    private service: GuildsService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.service.init();

    this.guild = this.service.getGuild(this.id);
    this.savedGuild = this.service.getSavedGuild(this.id);
    if (!this.savedGuild || !this.guild)
      return this.router.navigate(['']);

    this.seo.setTags({
      description: this.savedGuild.listing.overview,
      titlePrefix: `Vote for ${this.guild.name}`,
      titleSuffix: 'DList',
      url: `servers/${this.id}`
    });
  }

  async vote() {
    if (!this.userService.user) return;

    await this.service.vote(this.id);
    await this.service.refreshGuilds();

    return this.router.navigate(['/servers/' + this.id]);
  }
}
