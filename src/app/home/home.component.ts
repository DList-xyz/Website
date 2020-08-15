import { Component } from '@angular/core';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(seo: SEOService) {
    seo.setTags({
      titleSuffix: 'DList',
      titlePrefix: 'Find Discord Guilds',
      description: 'Find the best guilds to add to your servers. We have many different guilds including music guilds, moderation guilds, chat guilds and more.',
      url: '/'
    });
  }
}
