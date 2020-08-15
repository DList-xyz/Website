import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagService {
  tags: Tag[] = [
    { name: 'anime', icon: 'fas fa-apple-alt', description: 'Wanna discuss about anime and manga? Join anime and manga servers just to discuss about them!'},
    { name: 'community', icon: 'fas fa-apple-alt', description: 'Community servers to meet awesome people!'},
    { name: 'gaming', icon: 'fas fa-apple-alt', description: 'Gamerz? Join Gaming discord servers to play games together!'},
    { name: 'music', icon: 'fas fa-apple-alt', description: `What's your favorite music? Join these discord server to share your music playlist and talk about music!`},
    { name: 'technology', icon: 'fas fa-apple-alt', description: `Hey, did you see new tech that's gonna release? Discuss these by joining these servers under technology tag!`},
    ];

  getTag(name: string) {
    return this.tags.find(t => t.name === name);
  }
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
