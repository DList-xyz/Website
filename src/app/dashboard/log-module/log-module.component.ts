import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GuildsService } from 'src/app/services/guilds.service';
import { UserService } from 'src/app/services/user.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-log-module',
  templateUrl: './log-module.component.html',
  styleUrls: ['./log-module.component.css']
})
export class LogModuleComponent implements OnInit {
  guild: any;
  savedGuild: any;

  members: any[];

  displayedColumns: string[] = ['number', 'by', 'old', 'new', 'at'];
  dataSource = new MatTableDataSource();
  changes: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private guildService: GuildsService,
    private route: ActivatedRoute,
    private seo: SEOService,
    public userService: UserService) {}

  async ngOnInit() {
    await this.guildService.init();

    const id = this.route.snapshot.paramMap.get('id');
    this.savedGuild = this.guildService.getSavedGuild(id);
    this.guild = this.guildService.getGuild(id);

    this.seo.setTags({
      titlePrefix: 'DList',
      titleSuffix: `${this.guild.name} Logs`,
      description: 'View guild logs and changes to the guild listing.',
      url: `dashboard/guilds/${id}/log`
    });

    const log = await this.guildService.getSavedLog(id);
    this.changes = log.changes.reverse();
    
    this.dataSource = new MatTableDataSource(this.changes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }
}
