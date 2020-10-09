import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PhoneService } from '../core/services/phone.service';
import { MainService } from '../core/services/main.service';
import { AuthService } from '../core/services/auth.service';
import { ConfigService } from '../core/services/config.service';
import { Country } from '../core/models/country.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  countries = [];
  country: Country;
  constructor(
    private phoneService: PhoneService,
    private authService: AuthService,
    private configService: ConfigService,
    private mainService: MainService
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
      ]),
      rememberme: new FormControl(false)
    })
  }
  login() {
    const phone = this.loginForm.get('phoneFormControl').value;
    const pass = this.loginForm.get('passwordFormControl').value;
    const countryId = this.countries.filter(item => item.countryCode == this.country)[0]['id'];

    this.authService.login(countryId, phone, pass).subscribe(
      data => {
        if (this.loginForm.get('rememberme').value) {
          this.configService.setCacheItem('token', data.result.accessToken);
          this.configService.setCacheItem('refreshToken', data.result.refreshToken);
        }
        else {
          this.configService.setSessionStorage('token', data.result.accessToken);
          this.configService.setSessionStorage('refreshToken', data.result.refreshToken);
        }
        this.mainService.showSnackBar('welcome!');
      },
      error => {
        console.log('error: ', error);
        this.mainService.showErrorSnackBar('please try again');
      }
    );
  }
}
