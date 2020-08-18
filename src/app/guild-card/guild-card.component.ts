import { Component, Input } from '@angular/core';
import { kebabToTitleCase } from '../utils';

@Component({
  selector: 'guild-card',
  templateUrl: './guild-card.component.html',
  styleUrls: ['./guild-card.component.css']
})
export class GuildCardComponent {
  @Input() guild = {
    id: '',
    iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    name: 'Server'
  }

  @Input() savedGuild = {
    listing: {
      body: '',
      overview: 'A good server I guess...',
      language: 'en',
      tags: ['Community']
    },
    invite: '',
    votes: ['218459216145285121']
  }

  get cleanTags() {
    return this.savedGuild.listing.tags
      ?.map(t => kebabToTitleCase(t))
      .slice(0, 3)
      .join(', ');
  }
}
