import { Component, Input } from '@angular/core';
import { kebabToTitleCase } from '../utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'guild-card',
  templateUrl: './guild-card.component.html',
  styleUrls: ['./guild-card.component.css']
})
export class GuildCardComponent {
  @Input() guild = {
    id: '',
    iconURL: environment.defaultIconURL,
    memberCount: 0,
    name: 'Server'
  }
  
  @Input() savedGuild = {
    listing: {
      body: '',
      overview: 'A good server I guess...',
      language: 'en',
      tags: ['Community']
    },
    lastBumpAt: new Date().toString(),
    invite: '',
    votes: ['218459216145285121']
  }

  defaultIconURL = environment.defaultIconURL;

  get cleanTags() {
    return this.savedGuild.listing.tags
      ?.map(t => kebabToTitleCase(t))
      .join(', ');
  }

  get lastBumpTimestamp() {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = new Date().getTime() - new Date(this.savedGuild.lastBumpAt)?.getTime();
    if (elapsed < msPerMinute)
      return Math.round(elapsed / 1000) + ' seconds ago';
    else if (elapsed < msPerHour)
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    else if (elapsed < msPerDay)
      return Math.round(elapsed / msPerHour) + ' hours ago';
    else if (elapsed < msPerMonth)
      return Math.round(elapsed / msPerDay) + ' days ago';
    else if (elapsed < msPerYear)
      return Math.round(elapsed / msPerMonth) + ' months ago';
    else if (!this.savedGuild.lastBumpAt)
      return 'N/A';
    else
      return Math.round(elapsed / msPerYear) + ' years ago';
  }
}
