import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class GuildsService {
  endpoint = environment.endpoint + '/guilds';
  
  private _guilds: any[];
  get guilds() { return this._guilds; }
  
  private _savedGuilds: any[];
  get savedGuilds() { return this._savedGuilds; }

  private _userGuilds: any[];
  get userGuilds() { return this._userGuilds; }
  
  private _userSavedGuilds: any[];
  get userSavedGuilds() { return this._userSavedGuilds; }

  constructor(
    private http: HttpClient,
    private userService: UserService) {}
  
  private get key() { return localStorage.getItem('key'); }

  async init() {
    try {
      if (!this.guilds || !this.savedGuilds)
        await this.refreshGuilds();
      if (!this.userGuilds || !this.userSavedGuilds)
        await this.refreshUserGuilds();
    } catch {}
  }

  async refreshGuilds() {
    const { saved, guilds } = await this.http.get(`${this.endpoint}`).toPromise() as any;

    this._savedGuilds = saved
      .filter(s => guilds.some(g => g.id === s._id))
      .sort((a, b) => b.votes.length - a.votes.length);

    const ids = this.savedGuilds.map(g => g._id);
    this._guilds = guilds.filter(g => ids.includes(g.id));
  }
  async refreshUserGuilds() {
    await this.userService.init(); 

    const userGuilds = this.guilds
      .filter(g => g.managerIds.includes(this.userService.user.id));
    this._userGuilds = userGuilds;

    this._userSavedGuilds = userGuilds
      .map(g => g.id)
      .filter(id => this.getSavedGuild(id));
  }
  getSavedLog(id: string) {
    return this.http.get(`${this.endpoint}/${id}/log?key=${this.key}`).toPromise() as Promise<any>;
  }

  getGuild(id: string) {
    return this.guilds.find(g => g.id === id);
  }
  getSavedGuild(id: string) {
    return this.savedGuilds.find(g => g._id === id);
  }
  
  vote(id: string) {
    return this.http.get(`${this.endpoint}/${id}/vote?key=${this.key}`).toPromise() as Promise<any>;
  }

  getBumpedGuilds() {
    const savedGuilds = [...this.savedGuilds]
      .filter(g => g.lastBumpAt)
      .sort((a, b) => (a.lastBumpAt > b.lastBumpAt) ? -1 : 1);

    const ids = savedGuilds.map(g => g._id);
    const guilds = ids.map(id => this.guilds.find(g => g.id === id));

    return { guilds, saved: savedGuilds };
  }
  getTopGuilds() {
    return {
      guilds: this.savedGuilds
        .map(sb => this.guilds.find(g => g.id === sb._id)),
      saved: [...this.savedGuilds]
        .sort((a, b) => b.votes.length - a.votes.length)
    };
  }
  getTaggedGuilds(tagName: string) {
    const savedGuilds = this.savedGuilds
      .filter(g => g.listing?.tags
        .some(n => n === tagName));

    const ids = savedGuilds.map(g => g._id);
    const guilds = ids.map(id => this.guilds.find(g => g.id === id));

    return { guilds, saved: savedGuilds };
  }
  getNewGuilds() {
    const oneWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const savedGuilds = this.savedGuilds
      .filter(b => new Date(b.approvedAt) > oneWeekAgo); 
    
    const ids = savedGuilds.map(g => g._id);
    const guilds = this.guilds.filter(b => ids.includes(b.id));

    return { guilds, saved: savedGuilds };
  }
  getFeaturedGuilds() {
    const savedGuilds = this.savedGuilds
      .filter(g => g.badges?.includes('featured'));
    
    const ids = savedGuilds.map(g => g._id);
    const guilds = this.guilds.filter(g => ids.includes(g.id));

    return { guilds, saved: savedGuilds };
  }
  searchGuilds(query: string) {
    const queryGuilds = this.savedGuilds
      .map(saved => {
        const guild = this.guilds.find(g => g.id === saved._id);
        return {
          id: guild?.id,
          name: guild?.name,
          ownerId: saved.ownerId,
          listing: saved?.listing ?? {}
        };
      });

    const fuse = new Fuse(queryGuilds, {
      includeScore: true,
      keys: [
        { name: 'id', weight: 1 },
        { name: 'ownerId', weight: 1 },
        { name: 'name', weight: 0.8 },
        { name: 'listing.overview', weight: 0.6 },
        { name: 'listing.body', weight: 0.5 },
        { name: 'listing.tags', weight: 0.3 }
      ]
    });

    const searchGuilds = fuse
      .search(query)
      .map(r => r.item);

    const ids = searchGuilds.map(g => g.id);
    return {
      guilds: this.guilds.filter(g => ids.includes(g.id)),
      saved: this.savedGuilds.filter(g => ids.includes(g._id))
    };
  }

  updateGuild(id: string, value: any) {
    return this.http.put(`${this.endpoint}/${id}?key=${this.key}`, value).toPromise() as Promise<any>;
  }
  async deleteGuild(id: string) {
    await this.http.delete(`${this.endpoint}/${id}?key=${this.key}`).toPromise() as Promise<any>;
    await this.refreshGuilds();
  }

  async approveGuild(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: true,
      reason
    } as Judgement).toPromise() as Promise<any>;
    
    await this.refreshGuilds();
  }
  async declineGuild(id: string, reason: string) {
    await this.http.post(`${this.endpoint}/${id}/review?key=${this.key}`, {
      approved: false,
      reason
    } as Judgement).toPromise() as Promise<any>;
    
    await this.refreshGuilds();
  }
  addBadge(id: string, name: string) {
    return this.http.get(`${this.endpoint}/${id}/add-badge/${name}?key=${this.key}`).toPromise() as Promise<any>;
  }

  getStats(id: string) {
    return this.http.get(`${this.endpoint}/${id}/stats`).toPromise() as Promise<any>;
  }

  report(id: string, reason: string) {
    return this.http.get(`${this.endpoint}/${id}/report?key=${this.key}&reason=${reason}`).toPromise() as Promise<any>;
  }

  canManage(id: string) {
    const guild = this.guilds.find(g => g?.id === id);
    return guild?.managerIds.includes(this.userService.user?.id); 
  }
}

export interface Judgement {
  approved: boolean;
  reason: string;
}