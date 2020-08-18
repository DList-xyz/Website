import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() guild: any;
  @Output() report = new EventEmitter();
  @ViewChild('reason') reason: MatInput;
}
