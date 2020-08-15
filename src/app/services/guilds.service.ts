import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { environment } from 'src/environments/environment';

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

  get unreviewedGuilds() {
    const savedGuilds = this.savedGuilds.filter(b => !b.approvedAt);
    const ids = savedGuilds.map(g => g._id);
    const guilds = [];
    for (const id of ids)
      guilds.push(this.guilds.find(g => g.id === id));

    return { guilds, saved: savedGuilds };
  }

  constructor(private http: HttpClient) {}
  
  private get key() { return localStorage.getItem('key'); }

  async init() {
    try {
      if (!this.guilds || !this.savedGuilds)
        await this.refreshGuilds();
      if (!this.userGuilds || !this.userSavedGuilds)
        await this.updateUserGuilds();
    } catch {}
  }

  async refreshGuilds() {
    const guilds = await this.http.get(`${this.endpoint}`).toPromise() as any;

    this._savedGuilds = guilds.saved
      .sort((a, b) => b.votes.length - a.votes.length);    

    const ids = this.savedGuilds.map(g => g._id);
    this._guilds = guilds.users.filter(b => ids.includes(b.id));
  }
  async updateUserGuilds() {
    this._userGuilds = (this.key) ?
      await this.http.get(`${this.endpoint}/user?key=${this.key}`).toPromise() as any : null;

    this._userSavedGuilds = (this.key) ?
      await this.http.get(`${this.endpoint}/user/saved?key=${this.key}`).toPromise() as any : null;
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

  getTopGuilds() {
    const savedGuilds = this.savedGuilds.filter(g => g.approvedAt);
    const ids = savedGuilds.map(g => g._id);
    const guilds = [];
    for (const id of ids)
      guilds.push(this.guilds.find(g => g.id === id));

    return { guilds, saved: savedGuilds };
  }
  getTaggedGuilds(tagName: string) {
    const savedGuilds = this.savedGuilds
      .filter(g => g.approvedAt &&
        g.listing?.tags
        .some(n => n === tagName));
    const ids = savedGuilds.map(g => g._id);

    const guilds = [];
    for (const id of ids)
      guilds.push(this.guilds.find(g => g.id === id));

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
    const guilds = this.guilds.filter(b => ids.includes(b.id));

    return { guilds, saved: savedGuilds };
  }
  searchGuilds(query: string) {
    const fuse = new Fuse(this.savedGuilds, {
      includeScore: true,
      keys: [
        { name: 'listing.overview', weight: 1 },
        { name: 'listing.body', weight: 0.5 },
        { name: 'listing.tags', weight: 0.3 }
      ]
    });
    
    const savedGuilds = fuse
      .search(query)
      .map(r => r.item);    

    const ids = savedGuilds.map(g => g._id);
    const guilds = this.guilds
      .filter(b => ids.includes(b.id));    

    return { guilds, saved: savedGuilds };
  }

  createGuild(value: any) {
    return this.http.post(`${this.endpoint}?key=${this.key}`, value).toPromise() as Promise<any>;
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
}

export interface Judgement {
  approved: boolean;
  reason: string;
}