import { Component, OnInit } from '@angular/core';
import { GuildsService } from 'src/app/services/guilds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from 'src/app/services/seo.service';
import { isSnowflake } from 'src/app/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  guild: any;
  savedGuild: any;
  stats: any;
  id: string;

  get inviteURL() { return `${environment.endpoint}/invite?id=${this.id}`; }

  constructor(
    private guildsService: GuildsService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('id');
      this.id = id;
       
      this.guild = await this.guildsService.getGuild(id);
      this.stats = await this.guildsService.getStats(id);
      this.savedGuild = await this.guildsService.getSavedGuild(id);
  
      if (!isSnowflake(id))
        return this.router.navigate(['/dashboard']);
      else if (this.guild)
        return this.seo.setTags({
          description: `Overview of ${this.guild.name} Server listing.`,
          titlePrefix: this.guild.name,
          titleSuffix: 'Overview',
          url: `dashboard/guilds/${this.guild.id}`
        });
    });
  }
}
