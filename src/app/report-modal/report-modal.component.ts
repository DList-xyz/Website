import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() guild: any;
  @Output() report = new EventEmitter();
  @ViewChild('reason') reason: MatInput;
  
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  emitReport() {    
    this.recaptchaV3Service.execute('report')
      .subscribe((token) => this.report.emit(this.reason.value));
  }
}
