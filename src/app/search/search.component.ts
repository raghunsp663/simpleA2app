import { Component, OnInit, Directive, forwardRef, Attribute, OnChanges, SimpleChanges, Input, ViewContainerRef  } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { InsuranceServiceService } from './../insurance-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model: any = {};
  vehicle: any = {};
  addForm: Boolean = false;
  searchDetails: Boolean = false;
  find: any = {};
  token: string;

  vehicleModel = [
    {'id': '4001', 'name': 'Honda Activa'},
    {'id': '4002', 'name': 'TVS Victor' },
    {'id': '4003', 'name': 'Bajaj Pulsar' }
  ];

  constructor(
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private insuranceService: InsuranceServiceService,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.vehicle.vehicles_new_registered_year = '2016';
    this.vehicle.vehicles_new_model_id = '4001';
    this.vehicle.vehicles_new_policy_type_id = '1';
    this.vehicle.vehicles_new_created_by = '3';
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.toastr.custom('<span style="font-size:14px;">You need to verify your registed number to access this page</span>', 'Alert!',
      { enableHTML: true });
      this.router.navigate(['main']);
    }
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.vehicle);
    this.insuranceService.addVehicle(this.vehicle)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status == 1) {
          this.toastr.custom('<span style="font-size:14px; color:green">New vehicle details inserted successfully!!</span>',
            'Success!', { enableHTML: true }
          );
          this.searchDetails = false;
          this.addForm = false;
          this.vehicle = {};
        } else {
          this.toastr.error('Vehicle details not inserted', 'Oops!');
        }
      });
  }

  searchVehicle() {
    this.addForm = false;
    // this.toastr.info('Search initialted!', 'Success!', { toastLife: 5000 });
    // this.toastr.error('This is not good!', 'Oops!');
    // this.toastr.warning('You are being warned.', 'Alert!');
    // this.toastr.info('Just some information for you.');
    // this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });

    this.insuranceService.searchVehicle({ 'vehicle_no': this.model.search })
      .subscribe((data: any) => {
        console.log(data);
        if (data.status == 1) {
          this.toastr.custom('<span style="font-size:14px; color:green">Vehicle details found !!</span>',
            'Success!', { enableHTML: true }
          );
          this.searchDetails = true;
          this.find = data.data;
        } else {
          this.toastr.warning('Sorry !! Vehicle details not found', 'Alert!');
          this.find = {};
          this.searchDetails = false;
        }
      });
  }
  addVehicle() {
    this.addForm = true;
    this.searchDetails = false;
    this.find = {};
  }

  navigateMain() {
    localStorage.removeItem('token');
    this.router.navigate(['/main']);
  }
}
