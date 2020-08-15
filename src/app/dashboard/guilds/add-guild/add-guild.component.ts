import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SimpleMDE from 'simplemde';
import { toIterable } from 'src/app/utils';
import { GuildsService } from 'src/app/services/guilds.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { SEOService } from 'src/app/services/seo.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

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

  @Input() editing = false;

  form = new FormGroup({
    body: new FormControl('', [ Validators.required, Validators.minLength(300) ]),
    id: new FormControl(''),
    overview: new FormControl('', [ Validators.required, Validators.minLength(32), Validators.maxLength(128) ]),
    language: new FormControl(''),
    tags: new FormControl([], [ Validators.maxLength(5) ])
  });

  @Input() user = {
    id: '',
    displayAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    presence: { status: 'ONLINE' },
    tag: 'New Guild#0001',
    username: 'New Guild'
  }

  @Input() guild = {
    listing: {
      body: `Add something \`meaningful\` and **useful** here, to help your guild users.`,
      overview: 'Add guild summary here.'
    },
    guildCount: 100,
    votes: toIterable(100)
  };
  
  get widgetURL() { return `${environment.url}/api/guilds/525935335918665760/widget`; }

  constructor(
    public guildService: GuildsService,
    private router: Router,
    seo: SEOService,
    public tagService: TagService,
    private userService: UserService) {
      seo.setTags({
        description: 'Add a guild to the guild list with this form.',
        titlePrefix: 'Add Guild',
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

      this.form.get('guildId').setValidators([
        Validators.required, 
        Validators.pattern(/^\d{18}$/),
        Validators.pattern(new RegExp(`^(?!${this.userService.user.id}).*$`))
      ])
    });
  }

  private initFormValue() {
    for (const key in this.guild.listing)
      this.form.controls[key]
        ?.setValue(this.guild.listing[key]);
    
    this.editor.value(this.guild.listing.body);

    const draft = localStorage.getItem('guildListingDraft');
    
    if (!this.editing && draft)
      this.form.setValue(JSON.parse(draft));
  }

  private hookEvents() {
    const container = document.querySelector('.editor-container') as HTMLElement;
    container.onclick = container.onkeyup = () => {
      this.form.get('body').setValue(this.editor?.value());
      this.updateDraft();
    };

    this.form.valueChanges.subscribe(() => this.updateDraft());
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

  private updateDraft() {
    localStorage.setItem('guildListingDraft', JSON.stringify(this.form.value));   
    this.guild.listing = this.form.value; 
  }
  
  filterTags(filter: string): void {
    this.filteredTags = this.tagService.tags.filter(tag => tag.name.toLowerCase().includes(filter.toLowerCase()));
  }

  submit() {
    this.form.controls.body.setValue(this.editor.value());
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    this.guildService.createGuild(this.form.value);
  }
  update() {    
    this.form.controls.body.setValue(this.editor.value());
    if (this.form.invalid)
      return this.form.setErrors({ invalid: true });
    
    this.guildService.updateGuild(this.form.value.guildId, this.form.value);
  }

  navigateToGuildListing() {
    this.router.navigate(['/guilds/', this.form.value.guildId]);
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