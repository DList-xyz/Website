import { Component, Input, AfterViewInit } from '@angular/core';
import { kebabToTitleCase } from '../utils';

@Component({
  selector: 'guild-card',
  templateUrl: './guild-card.component.html',
  styleUrls: ['./guild-card.component.css']
})
export class GuildCardComponent {
  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    presence: { status: 'online' },
    username: 'Username'
  }

  @Input() guild = {
    listing: {
      invite: '',
      overview: 'A good guild I guess...',
      tags: ['Economy', 'Moderation']
    },
    stats: {
      guildCount: 10,
    },
    votes: ['218459216145285121']
  }

  get cleanTags() {
    return this.guild.listing.tags
      ?.map(t => kebabToTitleCase(t))
      .slice(0, 3)
      .join(', ');
  }
}
