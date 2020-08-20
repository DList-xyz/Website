import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { GuildsService } from 'src/app/services/guilds.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  get inviteURL() { return `${environment.endpoint}/invite`; }

  constructor(
    public guildService: GuildsService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.guildService.init();
  }

  toggle() {
    const icon = document.querySelector('#nav-icon1');
    icon.classList.toggle('open');
    this.drawer.toggle();
  }
}
