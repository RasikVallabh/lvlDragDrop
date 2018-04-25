import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>
  constructor() {
    this.datePickerConfig = Object.assign({},{containerClass: 'theme-default'});
  }
  ngOnInit() {
  }

}
