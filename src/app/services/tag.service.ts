import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagService {
  tags: Tag[] = [
    {
      name: "anime",
      icon: "fas fa-apple-alt",
      description: "Wanna discuss about anime and manga? Join anime and manga servers just to discuss about them!"
    },
    {
      name: "art",
      icon: "fas fa-palette",
      description: "Servers tagged with 'art'."
    },
    {
      name: "bots",
      icon: "fas fa-robot",
      description: "Servers tagged with 'bots'."
    },
    {
      name: "chat",
      icon: "fas fa-chat",
      description: "Servers tagged with 'chat'."
    },
    {
      name: "chill",
      icon: "fas fa-pepper-hot",
      description: "Servers tagged with 'chill'."
    },
    {
      name: "community",
      icon: "fas fa-user-friends",
      description: "Community servers to meet awesome people!"
    },
    {
      name: "fortnite",
      icon: "fas fa-gamepad",
      description: "Servers tagged with 'fortnite'."
    },
    {
      name: "friendly",
      icon: "fas fa-user-friends",
      description: "Servers tagged with 'friendly'."
    },
    {
      name: "friends",
      icon: "fas fa-user-friends",
      description: "Servers tagged with 'friends'."
    },
    {
      name: "games",
      icon: "fas fa-gamepad",
      description: "Servers tagged with 'games'."
    },
    {
      name: "gaming",
      icon: "fas fa-gamepad",
      description: "Gamerz? Join Gaming discord servers to play games together!"
    },
    {
      name: "givaways",
      icon: "fas fa-gift",
      description: "Servers tagged with 'giveaways'."
    },
    {
      name: "manga",
      icon: "fas fa-apple-alt",
      description: "Servers tagged with 'manga'."
    },
    {
      name: "meme",
      icon: "fas fa-apple-alt",
      description: "Servers tagged with 'meme'."
    },
    {
      name: "minecraft",
      icon: "fas fa-gamepad",
      description: "Servers tagged with 'minecraft'."
    },
    {
      name: "music",
      icon: "fas fa-music",
      description: "What's your favorite music? Join these discord server to share your music playlist and talk about music!"
    },
    {
      name: "roblox",
      icon: "fas fa-gamepad",
      description: "Servers tagged with 'roblox'."
    },
    {
      name: "rp",
      icon: "fas fa-theater-masks",
      description: "Servers tagged with 'rp'."
    },
    {
      name: "technology",
      icon: "fas fa-desktop",
      description: "Hey, did you see new tech that's gonna release? Discuss these by joining these servers under technology tag!"
    },
    {
      name: "youtube",
      icon: "fab fa-youtube",
      description: "Servers tagged with 'youtube'."
    }
  ]

  getTag(name: string) {
    return this.tags.find(t => t.name === name);
  }
}

export interface Tag {
  description: string;
  icon: string;
  name: string;
}
