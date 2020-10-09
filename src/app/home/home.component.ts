import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories;
  panelOpenState = false;
  constructor(
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      res=>console.log(res)
    );
  }

}
