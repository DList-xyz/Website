import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  discordInvite = environment.discordInvite;
  get inviteURL() { return `${environment.endpoint}/invite`; }

  get user() { return this.userService.user; }

  constructor(private userService: UserService) {}
}
