import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildsService } from 'src/app/services/guilds.service';
import { SEOService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-guild-widget',
  templateUrl: './guild-widget.component.html',
  styleUrls: ['./guild-widget.component.css']
})
export class GuildWidgetComponent implements OnInit {
  guild: any;
  savedGuild: any;

  form = new FormGroup({
    size: new FormControl('large')
  });

  get widgetURL() { return `${environment.endpoint}/guilds/${this.id}/widget?size=${this.form.value.size}`; }
  get id() { return this.route.snapshot.paramMap.get('id'); }

  constructor(
    private route: ActivatedRoute,
    private service: GuildsService,
    private seo: SEOService) {}

    async ngOnInit() {
      await this.service.init();
      
      this.savedGuild = this.service.getSavedGuild(this.id);
      this.guild = this.service.getGuild(this.id);
      
      this.seo.setTags({
        description: '',
        titlePrefix: this.guild.name,
        titleSuffix: 'Dashboard',
        url: `dashboard/guilds/${this.id}`
      });
    }
}