import { Component, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { GuildsComponent } from '../guilds.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SEOService as SEOService, TypingSEO } from 'src/app/services/seo.service';
import { kebabToLowerCase, kebabToTitleCase } from 'src/app/utils';
import { TagService } from 'src/app/services/tag.service';
import { GuildsService } from 'src/app/services/guilds.service';

@Component({
  selector: 'search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css', './space.scss']
})
export class SearchWrapperComponent implements AfterViewInit {
  @ViewChild('guilds') guildsComponent: GuildsComponent;
  @ViewChild('searchInput') searchInput: any;

  placeholder = '';
  initialized = false;

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildsService,
    private router: Router,
    private seo: SEOService,
    public tagService: TagService) {
    this.placeholder = kebabToLowerCase(this.getRandomPlaceholder());
  }

  async ngAfterViewInit() {
    await this.guildService.init();
    
    setTimeout(async() => {
      const query = this.route.snapshot.queryParamMap.get('q');
      if (query)
        await this.search(query);

      this.route.paramMap.subscribe(map => {
        const tagName = map.get('tag');        
        if (tagName)
          this.searchByTag(tagName);
      });

      this.initialized = true;
    });
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.tagService.tags.length - 1));
    return this.tagService.tags[i].name;
  }

  async search(query: string) {
    const extra = (query) ? { queryParams: { q: query } } : {};
    this.router.navigate(['search'], extra);

    this.updateMetaTags({
      description: `Find servers similar to '${query}'.`,
      titleSuffix: `${query} Servers`,
      url: `search/q?=${query}`
    });

    await this.guildsComponent.search(query);
  }

  searchByTag(name: string) {
    const tag = this.tagService.getTag(name);
    this.guildsComponent.setTagLayout(tag);

    this.updateMetaTags({
      description: tag.description,
      titleSuffix: `${kebabToTitleCase(tag.name)} Servers`,
      url: `tags/${tag.name}`
    });
  }

  updateMetaTags(content: TypingSEO) {
    this.seo.setTags(content);
  }
}