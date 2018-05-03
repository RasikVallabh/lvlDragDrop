import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerConfig, BsDropdownModule} from 'ngx-bootstrap';
import {ProposalCountryModel} from './proposal.country.model';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import {SectorModel} from './sector.model';
import {ProposalDelModel} from './proposal.model';
import {ProposalSectorModel} from './proposal.sector.model';
import {CountryModel} from './country.model';
import {DATE} from 'ngx-bootstrap/chronos/units/constants';
import {DatePipe} from '@angular/common';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  @Input() item: SectorModel;
  datePickerConfig: Partial<BsDatepickerConfig>
  public approvalForm: FormGroup;
  app_sectorPlaceholder: string = 'Please Select Sector';
  app_countryPlaceholder: string = 'Please Select Country';
  proposalModel: ProposalDelModel;
  proposalSectorModelList: ProposalSectorModel[];
  proposalCountryModelList: ProposalCountryModel[];
  sectorList: SectorModel[] = [new SectorModel('Sector1',12,'sectordesc'),new SectorModel('Sector2',12,'sectordesc'),
    new SectorModel('Sector3',12,'sectordesc'),new SectorModel('Sector4',12,'sectordesc'),new SectorModel('Sector5',12,'sectordesc')];
  countryList: CountryModel[] = [new CountryModel('country1',12,'countrydesc'),new CountryModel('country2',12,'countrydesc'),new CountryModel('country3',12,'countrydesc'),new CountryModel('Country4',12,'sectordesc'),new CountryModel('Country5',12,'sectordesc')];
  sectorTemp: SectorModel;
  @ViewChild('fileInput') fileInput: ElementRef;
  nowDate = new Date();
  /*MOCK DATA CREATION START*/

  /*MOCK DATA CREATION END*/
  constructor(private _fb: FormBuilder, private datePipe: DatePipe) {

  }
  ngOnInit() {
    // we will initialize our form here
    this.approvalForm = this._fb.group({
      sectors: new FormArray([this.initSectors()]),
      countries: new FormArray([this.initCountries()])
    });
  }
  initSectors() {
    return this._fb.group({
      app_sector_approvalName: new FormControl(''),
      app_sector_approvalSector: new FormControl(SectorModel),
      app_sector_approvalDate: new FormControl(Date),
      avtar: new FormControl()
    });
  }
  initCountries() {
    return this._fb.group({
      app_country_approvalName: new FormControl(''),
      app_country_approvalCountries: new FormControl(''),
      app_country_approvalDate: new FormControl(Date)
    });
  }
  addSectors() {
    // add address to the list
    const control = <FormArray>this.approvalForm.controls['sectors'];
    control.push(this.initSectors());
  }
  addCountry() {
    // add address to the list
    const control = <FormArray>this.approvalForm.controls['countries'];
    control.push(this.initCountries());
  }
  removeSectors(i: number) {
    // remove address from the list
    const control = <FormArray>this.approvalForm.controls['sectors'];
    control.removeAt(i);
  }
  selectedSector() {

  }
  onSubmit(): void {
    console.log(this.approvalForm.controls.sectors.value);
    console.log(this.approvalForm.value.sectors[0].app_sector_approvalSector);
    this.sectorTemp = this.approvalForm.value.sectors[0].app_sector_approvalSector;
    console.log(this.sectorTemp);
  }
  onChangeSectorSel(event) {
    this.approvalForm.patchValue({app_sector_approvalSector: event });
    console.log(this.approvalForm.value.sectors[0].app_sector_approvalDate);
    this.datePipe.transform(this.approvalForm.value.sectors[0].app_sector_approvalDate, 'dd MMM yyyy');
    console.log(this.datePipe.transform(this.approvalForm.value.sectors[0].app_sector_approvalDate, 'dd MMM yyyy'));
  }
  onChangeCountrySel(event) {
    this.approvalForm.patchValue({app_country_approvalCountries: event });

}
onChangeDate(event) {
    console.log(event);
    
    this.nowDate = new Date( this.datePipe.transform(event, 'dd MMM yyyy'));
    console.log("CHANGEEVENT:::" + this.datePipe.transform(event, 'dd MMM yyyy'));
    console.log("CHANGEEVENT::value:::" + this.nowDate);
    this.approvalForm.patchValue({app_sector_approvalDate: this.nowDate });
    console.log("this.approvalForm:::" + this.approvalForm.value);
  }

  onFileChange(event) {
    const reader = new FileReader();
    console.log(this.approvalForm.controls.sectors);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.approvalForm.controls.sectors.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  clearFile() {
    this.approvalForm.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
