import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})

export class PlansComponent implements OnInit {
  plans: any[] = [];
  remDate : number = 0;
  plan : string = '';
  constructor(private carDataService: CarService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.carDataService.getplans().subscribe((plans) => {
      this.plans = plans;
    })

    this.carDataService.getinventory_level(id).subscribe((list) => {
      if (list.length > 0) {
        this.plan = list[0].plan;
        this.remDate = this.calculateDiff(list[0].expiry_date);
      }
    });

  }

  openModal(id: number) {
    const modalRef = this.modalService.open(PaymentComponent, { size: 'md' });
    modalRef.componentInstance.id = id;
    // modalRef.componentInstance.techSpecs_list = this.techSpecs_list;  // Pass the ID to the modal component
  }

  calculateDiff(dateS: string) {
    let dateSent = new Date();
    let currentDate = new Date(dateS);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
