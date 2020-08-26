import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { GuildLogComponent } from './dashboard/guild-log/guild-log.component';
import { GuildWidgetComponent } from './dashboard/guild-widget/guild-widget.component';
import { AddGuildComponent } from './dashboard/guilds/add-guild/add-guild.component';
import { EditGuildComponent } from './dashboard/guilds/edit-guild/edit-guild.component';
import { GuildSidebarComponent } from './dashboard/guilds/guild-sidebar/guild-sidebar.component';
import { GuildComponent } from './dashboard/guilds/guild/guild.component';
import { LogModuleComponent } from './dashboard/log-module/log-module.component';
import { SaveChangesComponent } from './dashboard/save-changes/save-changes.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AuditLogWidgetComponent } from './dashboard/widgets/audit-log-widget/audit-log-widget.component';
import { VotesWidgetComponent } from './dashboard/widgets/votes-widget/votes-widget.component';
import { DocsSidebarComponent } from './docs-sidebar/docs-sidebar.component';
import { DocsComponent } from './docs/docs.component';
import { GuildCardComponent } from './guild-card/guild-card.component';
import { GuildPageComponent } from './guild-page/guild-page.component';
import { GuildPreviewComponent } from './guild-preview/guild-preview.component';
import { GuildVoteComponent } from './guild-vote/guild-vote.component';
import { GuildsComponent } from './guilds/guilds.component';
import { SearchWrapperComponent } from './guilds/search-wrapper/search-wrapper.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HomeComponent } from './home/home.component';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaterialModule } from './material-module';
import { MemberUsernameComponent } from './member-username/member-username.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CleanDateTimePipe } from './pipes/clean-date-time.pipe';
import { DurationStringPipe } from './pipes/duration-string.pipe';
import { KebabToTitleCasePipe } from './pipes/kebab-to-sentence-case.pipe';
import { MiniDatePipe } from './pipes/mini-date.pipe';
import { TruncatedPipe } from './pipes/truncated.pipe';
import { RocketButtonComponent } from './rocket-button/rocket-button.component';
import { SEOService } from './services/seo.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { WavesComponent } from './waves/waves.component';
import { ZippyComponent } from './zippy/zippy.component';
import { ReportModalComponent } from './report-modal/report-modal.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { TransferHttpCacheModule } from '@nguniversal/common';

@Injectable()
export class AlertErrorHandler implements ErrorHandler {
  async handleError(error: Error | any) {
    try {
      console.log(error);

      const message = error?.error?.message
        ?? error?.rejection?.error?.message
        ?? error?.rejection?.error
        ?? error?.message
        ?? error
      alert(message);

      const key = localStorage.getItem('key');
      await fetch(`${environment.endpoint}/error?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
    } catch {}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    InviteComponent,
    LogoutComponent,
    DashboardComponent,
    SidebarComponent,
    SpinnerComponent,
    LogModuleComponent,
    GuildSidebarComponent,
    DashboardSidebarComponent,
    SaveChangesComponent,
    NotFoundComponent,
    DocsComponent,
    CleanDateTimePipe,
    MemberUsernameComponent,
    DocsSidebarComponent,
    ZippyComponent,
    AuditLogWidgetComponent,
    TruncatedPipe,
    DurationStringPipe,
    HomeFooterComponent,
    WavesComponent,
    AddGuildComponent,
    GuildPreviewComponent,
    GuildCardComponent,
    GuildsComponent,
    SearchWrapperComponent,
    EditGuildComponent,
    RocketButtonComponent,
    KebabToTitleCasePipe,
    MiniDatePipe,
    GuildPageComponent,
    GuildComponent,
    GuildVoteComponent,
    GuildLogComponent,
    CookieBannerComponent,
    VotesWidgetComponent,
    GuildWidgetComponent,
    ReportModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule,
    RecaptchaModule
  ],
  providers: [
    SEOService,
    { provide: ErrorHandler, useClass: AlertErrorHandler },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
