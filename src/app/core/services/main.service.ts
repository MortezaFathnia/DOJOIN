import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  static getToken(): string {
    return localStorage.getItem('Token');
  }

  showSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action || null, {
      duration: duration || 5000,
      horizontalPosition: 'right',
      panelClass: 'successSnackBar'
    });
  }

  showErrorSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action || null, {
      duration: duration || 5000,
      horizontalPosition: 'right',
      panelClass: 'customErrorSnackBar'
    });
  }
}
