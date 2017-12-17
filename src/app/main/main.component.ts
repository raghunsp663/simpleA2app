import { Component, OnInit, Directive, forwardRef, Attribute, OnChanges, SimpleChanges, Input, ViewContainerRef } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {InsuranceServiceService} from './../insurance-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  model: any = [];
  otp: any = [];
  showFormOTP: Boolean = false;
  showMobForm: Boolean = true;

  constructor(
    private insuranceService: InsuranceServiceService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  showOTPForm() {
    this.showFormOTP = true;
    this.showMobForm = false;
    console.log(this.model.mobile);
    // this.insuranceService.sendOTP({ 'phone': '9739391749' })
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
    this.toastr.custom('<span style="font-size:14px; color:green">Please enter OTP sent to your mobile</span>',
      'Success!', { enableHTML: true }
      );
  }

  verifyOTP() {
    this.toastr.custom('<span style="font-size:14px; color:green">Entered OTP is correct</span>',
      'Success!', { enableHTML: true }
    );
    this.router.navigate(['/search']);
  }
}
