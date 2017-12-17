import { Component, OnInit, Directive, forwardRef, Attribute, OnChanges, SimpleChanges, Input, ViewContainerRef  } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model: any = [];
  vehicle: any = [];
  addForm: Boolean = false;
  searchDetails: Boolean = false;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.vehicle.vehicles_new_registered_year = '2016';
    this.vehicle.vehicles_new_model_id = '9';
  }

  onSubmit() {
    console.log('onSubmit');
  }

  searchVehicle() {
    console.log('show toaster');
    this.searchDetails = true;
    this.addForm = false;
    this.toastr.info('Search initialted!', 'Success!', { toastLife: 5000 });
    // this.toastr.error('This is not good!', 'Oops!');
    // this.toastr.warning('You are being warned.', 'Alert!');
    // this.toastr.info('Just some information for you.');
    // this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }
  addVehicle() {
    this.addForm = true;
    this.searchDetails = false;
  }
}
