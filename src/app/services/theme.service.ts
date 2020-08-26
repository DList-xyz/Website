import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { constructor } from 'marked';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly defaultTheme = 'COSMOS';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object) {}

  changeTheme(theme: string) {
    localStorage.setItem('theme', theme);

    this.updateTheme();
  }

  updateTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme') ?? this.defaultTheme;
      document.querySelector('html').setAttribute('theme', theme);
    }
  }
}
