import { Component, Input, OnInit } from '@angular/core';
import { EncryptionService } from '../../services/encryption.service';
import { CarService } from '../../services/car.service';
import { CardDetails } from '../../services/Users';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {

  @Input() id: number = 0;
  cardNumber: string = '';
  price: number = 0;
  CardDetails: CardDetails = new CardDetails();

  constructor(
    private encryptionService: EncryptionService,
    private modalService: NgbModal,
    private service: CarService) { }

  ngOnInit(): void {
    this.service.getplan(this.id).subscribe((x) => {
      this.price = x.price;
      console.log(x);
    });
  }

  onSave() {

    console.log(this.CardDetails);
    //return;

    var cardDetails = {
      "CardDetails": {
        "Name": "John Smith",
        "Number": "4444333322221111",
        "ExpiryMonth": "12",
        "ExpiryYear": "25",
        "CVN": "123"
      }
    };

    let body = {
      cardDetails: cardDetails,
      amount: 100,
      level: this.id
    }

    const encryptedCardDetails = this.encryptionService.encrypt(JSON.stringify(body));
    this.service.payment(encryptedCardDetails).subscribe((x) => {
      console.log(x.message);
      Swal.fire({
        title: "PAID",
        text: "PAYMENT SUCCESSFULL",
        icon: "success"
      });
      this.modalService.dismissAll();
      // this.router.navigate(['/component/list']);
    });
  }

}
