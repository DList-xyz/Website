import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuildsService } from '../../../services/guilds.service';

@Component({
  selector: 'guild-sidebar',
  templateUrl: './guild-sidebar.component.html',
  styleUrls: ['./guild-sidebar.component.css']
})
export class GuildSidebarComponent implements OnInit {
  @Input('waitFor') loaded = true;
  
  id: string;
  guild: any;

  constructor(
    private guildService: GuildsService,
    private route: ActivatedRoute,
    private router: Router) {
      document.title = 'DList - Dashboard';
    }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      this.id = paramMap.get('id');

      this.guild = this.guildService.getGuild(this.id);
    });
  }
}
