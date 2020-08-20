import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildsService } from 'src/app/services/guilds.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-edit-guild',
  templateUrl: './edit-guild.component.html',
  styleUrls: ['./edit-guild.component.css']
})
export class EditGuildComponent implements OnInit {
  guild: any;
  savedGuild: any;

  get id() { return this.route.snapshot.paramMap.get('id') }

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
        titleSuffix: 'Edit',
        url: `dashboard/guilds/${this.id}`
      });
    }
}
