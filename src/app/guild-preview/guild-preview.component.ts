import { Component, Input, OnInit } from '@angular/core';
import marked from 'marked';
import { UserService } from '../services/user.service';
import { GuildsService } from '../services/guilds.service';
import { Router } from '@angular/router';
import { TagService } from '../services/tag.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'guild-preview',
  templateUrl: './guild-preview.component.html',
  styleUrls: ['./guild-preview.component.css']
})
export class GuildPreviewComponent implements OnInit {
  @Input() preview = false;
  ownerUser: any;
  defaultIconURL = environment.defaultIconURL;

  @Input() savedGuild = {
    badges: [],
    invite: '',
    listing: {
      body: '',
      overview: 'A good guild I guess...',
      language: '/',
      tags: ['music', 'moderation', 'utility']
    },
    ownerId: '218459216145285121',
    votes: ['218459216145285121']
  }

  @Input() guild = {
    id: '',
    iconURL: environment.defaultIconURL,
    name: 'Server'
  }

  get markdown() {
    return marked(this.savedGuild.listing.body, { breaks: true })
      .replace(/<a/g, '<a rel="nofollow" target="_blank" ');
  }

  get canManage() {
    return this.service.canManage(this.guild?.id);
  }

  constructor(
    public service: GuildsService,
    private router: Router,
    public tagService: TagService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.service.init();

    this.ownerUser = await this.userService.getUser(this.savedGuild.ownerId);
  }

  async delete() {
    const shouldDelete = prompt(`Type 'DELETE' to confirm guild page deletion.`) === 'DELETE';
    if (shouldDelete)
      await this.service.deleteGuild(this.guild.id);

    this.router.navigate(['/dashboard']);
  }

  async report(reason: string) {
    await this.service.report(this.guild.id, reason);
  }

  async addBadge(name: string) {
    await this.service.addBadge(this.guild.id, name);
    await this.service.refreshGuilds();
  }
}
