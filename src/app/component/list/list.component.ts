import { Component, OnInit } from '@angular/core';
import { Product, CarsModel, TableRows, Employee } from '../table/table-data';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  car: CarsModel[] = [];
  trow: TableRows[] = [];

  constructor(private carDataService: CarService, private router: Router) { }
  ngOnInit(): void {
    let id = parseInt(localStorage.getItem("id") || "0");
    this.carDataService.getcar(id).subscribe((makes) => {
      console.log(makes)
      this.car = makes;
    });
  }
}
