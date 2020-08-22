import { Component,  Input, OnInit, AfterViewInit } from '@angular/core';
import { GuildsService } from '../services/guilds.service';
import { kebabToTitleCase } from '../utils';
import { Tag } from '../services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit, AfterViewInit {
  @Input() tag: Tag;

  page = 1;
  size = 8;

  title = 'Recently Bumped';
  icon = 'fas fa-fist-raised';
  description = 'Servers that were recently bumped.';
  query = '';

  guilds = [];
  savedGuilds = [];

  initialized = false;

  get lastPage() { return Math.ceil(this.guilds.length / this.size); }

  constructor(
    public service: GuildsService,
    private router: Router) {}

  async ngOnInit() {
    await this.service.init();

    (this.tag) ? this.setTagLayout(this.tag) : this.loadGuilds();

    this.initialized = true;    
  }

  private loadTagLayout() {
    var guilds = [],
      saved = [];

    if (this.tag.name === 'featured')
      var { guilds, saved } = this.service.getFeaturedGuilds();
    else if (this.tag.name === 'new')
      var { guilds, saved } = this.service.getNewGuilds();
    else if (this.tag.name === 'top')
      var { guilds, saved } = this.service.getTopGuilds();
    else
      var { guilds, saved } = this.service.getTaggedGuilds(this.tag.name);

    this.guilds = guilds;
    this.savedGuilds = saved;
  }

  ngAfterViewInit() {
    this.resetPaginator();
  }

  private resetPaginator(page = 1) {
    this.page = page;
  }

  private loadGuilds(page = 1) {
    const { guilds, saved } = this.service.getBumpedGuilds();
    
    this.guilds = guilds;
    this.savedGuilds = saved;

    this.resetPaginator(page);
  }
  
  async search(query: string) {
    await this.service.init();

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
    this.title = 'Recently Bumped';
    this.icon = 'fas fa-fist-raised';
    this.description = 'Servers that were recently bumped.'

    this.loadGuilds();
    
    this.router.navigate(['/']);
  }

  private setSearchLayout() {
    this.title = `Results for '${this.query}'`;
    this.description = `Find servers similar to '${this.query}'.`
    this.icon = 'fas fa-search';
  }

  setTagLayout(tag: Tag) {
    this.title = `${kebabToTitleCase(tag.name)} Servers`;
    this.icon = tag.icon;
    this.description = tag.description;
    this.tag = tag;
    
    this.resetPaginator();
    this.loadTagLayout();
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
