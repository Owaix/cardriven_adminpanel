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
  constructor(private carDataService: CarService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.carDataService.getplans().subscribe((plans) => {
      this.plans = plans;
    })
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(PaymentComponent, { size: 'md' });
    modalRef.componentInstance.id =id ;  
    // modalRef.componentInstance.techSpecs_list = this.techSpecs_list;  // Pass the ID to the modal component
  }

}
