import { Component, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { GuildsComponent } from '../guilds.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SEOService as SEOService, TypingSEO } from 'src/app/services/seo.service';
import { GuildsService } from '../../services/guilds.service';
import { kebabToLowerCase, kebabToTitleCase } from 'src/app/utils';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent implements AfterViewInit {
  @ViewChild('guilds') guildsComponent: GuildsComponent;
  @ViewChild('searchInput') searchInput: any;

  placeholder = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    public tagService: TagService) {
    this.placeholder = kebabToLowerCase(this.getRandomPlaceholder());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const query = this.route.snapshot.queryParamMap.get('q');
      if (query)
        this.search(query);

      this.route.paramMap.subscribe(map => {
        const tagName = map.get('tag');
        if (tagName)
          this.searchByTag(tagName);
      });
    });
  }

  getRandomPlaceholder() {
    const i = Math.floor(Math.random() * (this.tagService.tags.length - 1));
    return this.tagService.tags[i].name;
  }

  search(query: string) {
    const extra = (query) ? { queryParams: { q: query } } : {};
    this.router.navigate(['search'], extra);

    this.updateMetaTags({
      description: `Find guilds similar to '${query}'.`,
      titleSuffix: `${query} Guilds`,
      url: `search/q?=${query}`
    });

    this.guildsComponent.search(query);
  }

  searchByTag(name: string) {
    const tag = this.tagService.getTag(name);
    this.guildsComponent.setTagLayout(tag);

    this.updateMetaTags({
      description: tag.description,
      titleSuffix: `${kebabToTitleCase(tag.name)} Guilds`,
      url: `tags/${tag.name}`
    });
  }

  updateMetaTags(content: TypingSEO) {
    this.seo.setTags(content);
  }
}