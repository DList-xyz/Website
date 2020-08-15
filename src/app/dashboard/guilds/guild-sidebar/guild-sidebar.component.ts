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
  savedGuild: any;

  constructor(
    private guildService: GuildsService,
    private route: ActivatedRoute,
    private router: Router) {
      document.title = '2PG - Dashboard';
    }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      this.id = paramMap.get('id');

      this.savedGuild = await this.guildService.getSavedGuild(this.id);
      this.guild = this.guildService.getGuild(this.id);
      
      if (!this.guild)
        this.router.navigate(['/dashboard']);
    });
  }
}
