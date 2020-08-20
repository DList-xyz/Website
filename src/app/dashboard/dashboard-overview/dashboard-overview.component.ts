import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SEOService } from 'src/app/services/seo.service';
import { GuildsService } from 'src/app/services/guilds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    public guildService: GuildsService,
    private seo: SEOService,
    public userService: UserService) {
  }

  async ngOnInit() {
    this.seo.setTags({
      titlePrefix: 'DList',
      titleSuffix: 'Dashboard',
      description: 'Manage Discord guild listings, view logs and more with the DList dashboard.',
      url: 'dashboard'
    });

    await this.guildService.init();
  }
}
