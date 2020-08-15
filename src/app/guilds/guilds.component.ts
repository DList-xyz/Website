import { Component,  Input, OnInit, AfterViewInit } from '@angular/core';
import { GuildsService } from '../services/guilds.service';
import { kebabToTitleCase } from '../utils';
import { Tag } from '../services/tag.service';

@Component({
  selector: 'guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit, AfterViewInit {
  page = 1;
  size = 8;

  title = 'Top';
  icon = 'fas fa-roguild';
  description = 'The highest rated guilds this week.';
  query = '';

  guilds = [];
  savedGuilds = [];
  @Input() tag: Tag;

  initialized = false;

  get lastPage() { return Math.ceil(this.guilds.length / this.size); }

  constructor(public service: GuildsService) {}

  async ngOnInit() {
    await this.service.init();

    if (this.tag) {
      var guilds = [],
          saved = [];
        
      if (this.tag.name === 'featured')
        var { guilds, saved } = this.service.getFeaturedGuilds();
      else if (this.tag.name === 'new')
        var { guilds, saved } = this.service.getNewGuilds();
      else
        var { guilds, saved } = this.service.getTaggedGuilds(this.tag.name);

      this.guilds = guilds;
      this.savedGuilds = saved;

      this.setTagLayout(this.tag);
    } else
      this.loadGuilds();

    this.initialized = true;    
  }

  ngAfterViewInit() {
    this.resetPaginator();
  }

  private resetPaginator(page = 1) {
    this.page = page;
  }

  private loadGuilds(page = 1) {
    const { guilds, saved } = this.service.getTopGuilds();
    this.guilds = guilds;
    this.savedGuilds = saved;

    this.resetPaginator(page);
  }
  
  search(query: string) {
    this.query = query;

    const { guilds, saved } = this.service.searchGuilds(query);
    this.guilds = guilds;
    this.savedGuilds = saved;
    
    this.resetPaginator();
      
    (query.length > 0)
      ? this.setSearchLayout()
      : this.setDefaultLayout();
  }

  private setDefaultLayout() {
    this.title = 'Top';
    this.icon = 'fas fa-roguild';
    this.description = 'The highest rated guilds this week.'

    this.loadGuilds();
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    this.description = `Find guilds similar to '${this.query}'.`
    this.icon = 'fas fa-search';
  }

  setTagLayout(tag: Tag) {
    this.title = `${kebabToTitleCase(tag.name)} Guilds`;
    this.icon = tag.icon;
    this.description = tag.description;
    this.tag = tag;
    
    this.resetPaginator();
  }

  previousPage() {
    this.page = Math.max(this.page - 1, 1);
  }
  nextPage() {
    this.page = Math.min(this.page + 1, this.lastPage);
  }
  
  paginate(array: any[]) {
    return array.slice((this.page - 1) * this.size, this.page * this.size);
  }
}
