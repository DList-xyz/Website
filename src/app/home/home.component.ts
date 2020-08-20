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
      titlePrefix: 'Find the Best Discord Servers',
      description: 'Find the best servers to add to your servers. We have many different servers including music servers, moderation servers, chat servers and more.',
      url: '/'
    });
  }
}
