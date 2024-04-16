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

  statusList: any[] = [
    { "id": "s", "name": "Sold", "status": "bg-danger" },
    { "id": "r", "name": "Reject", "status": "bg-danger" },
    { "id": "p", "name": "Pending", "status": "bg-danger" },
    { "id": "a", "name": "Approved", "status": "bg-danger" },
    { "id": "f", "name": "Pay-Failed", "status": "bg-danger" }
  ]

  constructor(private carDataService: CarService, private router: Router) { }
  ngOnInit(): void {
    let id = localStorage.getItem("id") || "";
    this.carDataService.getcar(id, '').subscribe((makes) => {
      console.log(makes)
      for (let i = 0; i < makes.length; i++) {
        makes[i].status = this.statusList.find(j => j.id == makes[i].status).name;
        //makes[i].statuslogo = this.statusList.find(j => j.id == makes[i].status).status;
      }
      this.car = makes;
    });
  }

  onKeyPress($event: any) {
    let id = localStorage.getItem("id") || "";
    this.carDataService.getcar(id, $event.target.value).subscribe((makes) => {
      console.log(makes)
      for (let i = 0; i < makes.length; i++) {
        makes[i].status = this.statusList.find(j => j.id == makes[i].status).name;
        //makes[i].statuslogo = this.statusList.find(j => j.id == makes[i].status).status;
      }
      this.car = makes;
    });
  }

  detail(id: number) {
    this.router.navigate(['/component/cardetail', id]);
  }

}
