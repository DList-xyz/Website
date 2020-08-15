import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagService {
  tags: Tag[] = [
    { name: 'anime', icon: 'far fa-circle', description: 'Find the best anime guilds from our list.' },
    { name: 'apex-legends', icon: 'fas fa-gamepad', description: 'Find the best Apex Legends guilds from our list.' },
    { name: 'chat', icon: 'fas fa-comments', description: 'Find the best chat guilds from our list.' },
    { name: 'csgo', icon: 'fas fa-gamepad', description: 'Find the best CSGO guilds from our list.' },
    { name: 'customizable', icon: 'fas fa-cogs', description: 'Find the best customizable guilds from our list.' },
    { name: 'economy', icon: 'fas fa-coins', description: 'Find the best economy guilds from our list.' },
    { name: 'fortnite', icon: 'fas fa-gamepad', description: 'Find the best Fortnite guilds from our list.' },
    { name: 'fun', icon: 'fas fa-grin-tears', description: 'Find the most fun guilds from our list.' },
    { name: 'league-of-legends', icon: 'fas fa-gamepad', description: 'Find the best League of Legends guilds from our list.' },
    { name: 'leveling', icon: 'fas fa-trophy', description: 'Find the most advanced Leveling guilds from our list.' },
    { name: 'logging', icon: 'fas fa-tree', description: 'Find the best logging guilds from our list, with staff logs and more.' },
    { name: 'media', icon: 'fas fa-photo-video', description: 'Find the best media guilds from our list.' },
    { name: 'meme', icon: 'fas fa-grin-tears', description: 'Find the best EPIC meme guilds from our list, with guilds like Dank Memer and many other classics.' },
    { name: 'minecraft', icon: 'fas fa-gamepad', description: 'Find the best Minecraft guilds from our list.' },
    { name: 'mixer', icon: 'fab fa-mixer', description: 'Find the best Mixer guilds from our list, and other live streaming guilds.' },
    { name: 'moderation', icon: 'fas fa-gavel', description: 'Find the best moderation guilds from our list, with guilds like Mee6, Dyno guild and much more.' },
    { name: 'multipurpose', icon: 'fas fa-adjust', description: 'Find the best multipurpose guilds from our list, with many all-in-one features.' },
    { name: 'music', icon: 'fas fa-music', description: 'Find the best music guilds from our list, with guilds like Groovy, Rythm, Octave, and many more epic guilds.' },
    { name: 'pokemon', icon: 'fas fa-gamepad', description: 'Find the best Pokemon guilds from our list.' },
    { name: 'pugb', icon: 'fas fa-gamepad', description: 'Find the best PUBG guilds from our list.' },
    { name: 'reddit', icon: 'fab fa-reddit', description: 'Find the best Reddit guilds from our list.' },
    { name: 'roblox', icon: 'fas fa-gamepad', description: 'Find the best Roblox guilds from our list.' },
    { name: 'rocket-league', icon: 'fas fa-gamepad', description: 'Find the best Rocket League guilds from our list.' },
    { name: 'roleplay', icon: 'fas fa-theater-masks', description: 'Find the best Roleplay guilds from our list.' },
    { name: 'roles', icon: 'fas fa-at', description: 'Find the best anime role management guilds from our list.' },
    { name: 'runescape', icon: 'fas fa-gamepad', description: 'Find the best Runescape guilds from our list.' },
    { name: 'soundboard', icon: 'fas fa-volume-up', description: 'Find the best soundboard guilds from our list.' },
    { name: 'twitch', icon: 'fab fa-twitch', description: 'Find the best Twitch guilds from our list, and more live streaming guilds.' },
    { name: 'twitter', icon: 'fab fa-twitter', description: 'Find the best Twitter guilds from our list.' },
    { name: 'utility', icon: 'fas fa-cogs', description: 'Find the best utility guilds from our list.' },
    { name: 'valorant', icon: 'fas fa-gamepad', description: 'Find the best Valorant guilds from our list.' },
    { name: 'verification', icon: 'fa fa-check-circle', description: 'Find the best verification guilds from our list, and more guilds that can help secure your servers.' },
    { name: 'web-dashboard', icon: 'fas fa-cogs', description: 'Find the best web dashboard guilds from our list.' },
    { name: 'youtube', icon: 'fab fa-youtube', description: 'Find the best YouTube guilds from our list, and other music and live streaming guilds.' }
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
