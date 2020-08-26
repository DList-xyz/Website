import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { DocsComponent } from './docs/docs.component';
import { SearchWrapperComponent } from './guilds/search-wrapper/search-wrapper.component';
import { GuildAuthGuard } from './guards/guild-auth.guard';
import { GuildPageComponent } from './guild-page/guild-page.component';
import { GuildComponent } from './dashboard/guilds/guild/guild.component';
import { GuildVoteComponent } from './guild-vote/guild-vote.component';
import { LogoutComponent } from './logout/logout.component';
import { EditGuildComponent } from './dashboard/guilds/edit-guild/edit-guild.component';
import { LogModuleComponent } from './dashboard/log-module/log-module.component';
import { GuildWidgetComponent } from './dashboard/guild-widget/guild-widget.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'docs/:page', component: DocsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'search', component: SearchWrapperComponent },
  { path: 'tags/:tag', component: SearchWrapperComponent },

  { path: 'servers/:id', component: GuildPageComponent },
  { path: 'servers/:id/vote', component: GuildVoteComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuthGuard] },
  
  { path: 'dashboard/servers/:id', component: GuildComponent, canActivate: [GuildAuthGuard] },
  { path: 'dashboard/servers/:id/edit', component: EditGuildComponent, canActivate: [GuildAuthGuard] },
  { path: 'dashboard/servers/:id/widget', component: GuildWidgetComponent, canActivate: [GuildAuthGuard] },
  { path: 'dashboard/servers/:id/log', component: LogModuleComponent, canActivate: [GuildAuthGuard] },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
