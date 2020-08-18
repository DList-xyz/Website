import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';
import { toIterable } from 'src/app/utils';
import { GuildsService } from 'src/app/services/guilds.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { SEOService } from 'src/app/services/seo.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'add-guild',
  templateUrl: './add-guild.component.html',
  styleUrls: ['./add-guild.component.css']
})
export class AddGuildComponent implements AfterViewInit {
  preview = false;
  editor: SimpleMDE;

  toIterable = toIterable;
  filteredTags = this.tagService.tags;

  form = new FormGroup({
    body: new FormControl('', [ Validators.required ]),
    overview: new FormControl('', [ Validators.required, Validators.minLength(0), Validators.maxLength(128) ]),
    language: new FormControl('en'),
    tags: new FormControl([], [ Validators.maxLength(5) ])
  });

  @Input() guild = {
    id: '',
    iconURL: '/assets/img/logo.png',
    name: 'New Server'
  }

  @Input() savedGuild = {
    listing: {
      body: `A server that has not yet been edited.`,
      overview: 'No description set.'
    },
    votes: toIterable(100)
  };

  constructor(
    public guildService: GuildsService,
    private router: Router,
    seo: SEOService,
    public tagService: TagService) {
      seo.setTags({
        description: 'Add a server to the server list with this form.',
        titlePrefix: 'Add Server',
        titleSuffix: 'Dashboard',
        url: 'dashboard/guilds/new'
      });
    }

  ngAfterViewInit() {
    setTimeout(async () => {
      await this.guildService.init();

      this.initializeEditor();
      this.initFormValue();
      this.hookEvents();
    });
  }

  private initFormValue() {
    for (const key in this.savedGuild.listing)
      this.form.controls[key]
        ?.setValue(this.savedGuild.listing[key]);
    
    this.editor.value(this.savedGuild.listing.body);
  }

  private hookEvents() {
    const container = document.querySelector('.editor-container') as HTMLElement;
    container.onclick = container.onkeyup = () => {
      this.form.get('body')
        .setValue(this.editor?.value());
    };
  }

  private initializeEditor() {
    const element = document.querySelector('#editor') as HTMLElement;
    this.editor = new SimpleMDE({
      element,
      toolbar: [
        'bold',
        'italic',
        'strikethrough',
        'heading',
        '|',
        'image',
        'link',
        'code',
        'quote',
        '|',
        'ordered-list',
        'unordered-list',
        'horizontal-rule',
        'table',
        '|',
        'guide'
      ]
    });
  }
  
  filterTags(filter: string): void {
    this.filteredTags = this.tagService.tags
      .filter(tag => tag.name
          .toLowerCase()
          .includes(filter.toLowerCase()));
  }

  async update() {    
    this.form.controls.body.setValue(this.editor.value());
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    await this.guildService.updateGuild(this.guild.id, this.form.value);
    await this.guildService.refreshGuilds();
  }

  navigateToGuildListing() {
    this.router.navigate(['/servers/', this.guild.id]);
  }

  // input events

  add(event: MatChipInputEvent, array: any[]) {        
    const { value, input } = event;

    if ((value || '').trim())
      array.push(value.trim());

    if (input) 
      input.value = '';
  }
  
  remove(item: any, array: any[]) {
    const index = array.indexOf(item);
    if (index >= 0)
      array.splice(index, 1);
  }
}

export interface Listing {
  id: string;
  body: string;
  language: string;
  overview: string;
  tags: string[];
}