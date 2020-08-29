import {Component, Input, OnInit} from '@angular/core';
import {ErrorMessages} from '../../../../common/api/error.messages';
@Component({
  selector: 'app-error-summary',
  templateUrl: './error-summary.component.html',
  styleUrls: ['./error-summary.component.css']
})
export class ErrorSummaryComponent implements OnInit {
  @Input()
  errors: ErrorMessages[];
  @Input()
  isAPISuccess: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
