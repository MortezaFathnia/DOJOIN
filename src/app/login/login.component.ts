import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PhoneService } from '../core/services/phone.service';
import { MainService } from '../core/services/main.service';
import { AuthService } from '../core/services/auth.service';
import { Country } from '../core/models/country.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  countries=[];
  country: Country;
  constructor(
    private phoneService: PhoneService,
    private authService: AuthService,
    private mainService:MainService
  ) {
    this.phoneService.getCountryCode().subscribe(res => this.countries = res);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      phoneFormControl: new FormControl('', [
        Validators.required
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
      ])
    })
  }
  login() {
    const phone = this.loginForm.get('phoneFormControl').value;
    const pass = this.loginForm.get('passwordFormControl').value;
    const countryId = this.countries.filter(item =>  item.countryCode==this.country)[0]['id'];  

    this.authService.login(countryId, phone, pass).subscribe(
      data => {
        this.authService.isAuthenticated = true;
        this.mainService.showSnackBar('welcome!');
      },
      error => {
        console.log('error: ', error);
        this.mainService.showErrorSnackBar('please try again');
      }
    );
  }
}
