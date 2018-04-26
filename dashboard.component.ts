import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder, FormArray
} from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>
  constructor(private fb: FormBuilder) {
  }
  sectors: string[] = [
    'English',
    'French',
    'German',
  ];
  approvalsForm: FormGroup;
  formArray: FormArray;
  ngOnInit() {

    this.approvalsForm = new FormGroup({
      sector: new FormControl()
    });

    formArray: this.fb.array([]);
  }

}
