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
  user: any;

  get widgetURL() { return `${environment.endpoint}/guilds/${this.id}/widget?size=medium`; }
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
      titlePrefix: `Vote for ${this.user.username}`,
      titleSuffix: 'DList',
      url: `guilds/${this.id}`
    });
  }

  async vote() {
    if (!this.userService.user) return;

    await this.service.vote(this.id);
    await this.service.refreshGuilds();

    return this.router.navigate(['/guilds/' + this.id]);
  }

  async remind() {
    await Notification.requestPermission();

    new Notification(`DList - Vote Reminder`, {
      badge: `${environment.url}/guilds/${this.id}`,
      body: `You can vote again for ${this.user.username}.`,
      icon: this.user.displayAvatarURL,
      image: `${environment.url}/assets/img/logo.png`,
      renotify: true,
      timestamp: new Date().getTime() + (12 * 60 * 60 * 1000),
      tag: 'Vote Reminder'
    });
  }
}
