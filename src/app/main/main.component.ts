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

  model: any = {};
  otpObj: any = {};
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

  changeNumber() {
    this.showFormOTP = false;
    this.showMobForm = true;
    this.model = {};
    this.otpObj = {};
  }

  showOTPForm() {
    console.log(this.model.mobile);
    // this.insuranceService.sendOTP({ 'phone': this.model.phone})
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     this.showFormOTP = true;
    //     this.showMobForm = false;
    //     if(data.status === 1) {
    //       this.toastr.custom('<span style="font-size:14px; color:green">Otp has sent to your mobile</span>',
    //         'Success!', { enableHTML: true }
    //       );
    //     }
    //   });
    this.insuranceService.sendOTP({ 'phone': this.model.phone}).subscribe(
      comments => {
        this.showFormOTP = true;
        this.showMobForm = false;
        this.toastr.custom('<span style="font-size:14px; color:green">Otp has sent to your mobile</span>',
            'Success!', { enableHTML: true }
          );
      }, 
      err => {
          this.toastr.error('Please install CORS plugin to your browser to run this web app',
          'Error!');
      });  
  }

  verifyOTP() {
    console.log(this.otpObj.otp);
    this.insuranceService.verifyOTP({ 'otp': this.otpObj.otp })
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 1) {
          const token = data.token;
          localStorage.setItem('token', token);
          this.toastr.custom('<span style="font-size:14px; color:green">Entered OTP is correct</span>',
            'Success!', { enableHTML: true }
          );
          this.router.navigate(['/search']);
        }
        if (data.status === 3) {
          this.toastr.error('Invalid OTP', 'Error!');
        }
      });
  }
}
