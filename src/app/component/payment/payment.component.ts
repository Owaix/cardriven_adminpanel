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
  msg = "";
  price: number = 0;
  isNameEmpty = false;
  isNumberEmpty = false;
  dataLoaded: boolean = false;
  isDisablebutton: boolean = false;
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
    this.msg = '';
    this.isNameEmpty = false;
    this.isNumberEmpty = false;
    if (this.CardDetails.Name == "") {
      this.msg += 'Please enter Name</br>';
      this.isNameEmpty = true;
    }
    if (this.CardDetails.Number == "") {
      this.msg += 'Please enter Card #';
      this.isNumberEmpty = true;
    }
    if (this.msg != "") {
      //alert(msg);
      return;
    }
    this.dataLoaded = true;
    this.isDisablebutton = true;
    console.log(this.CardDetails);

    var cardDetails = {
      "CardDetails": {
        "Name": this.CardDetails.Name,
        "Number": this.CardDetails.Number,
        "ExpiryMonth": "12",
        "ExpiryYear": "25",
        "CVN": this.CardDetails.CVN
      }
    };

    let body = {
      cardDetails: cardDetails,
      amount: this.price,
      level: this.id
    }

    const encryptedCardDetails = this.encryptionService.encrypt(JSON.stringify(body));
    this.service.payment(encryptedCardDetails).subscribe((x) => {
      this.dataLoaded = false;
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

  onKeyPress(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    const currentInput = this.CardDetails.Expiry;

    // Allow only numbers
    if (!/[0-9]/.test(inputChar)) {
      event.preventDefault();
      return;
    }

    // Allow backspace and delete keys
    if (event.keyCode === 8 || event.keyCode === 46) {
      return;
    }

    // Add slash after entering two digits for month
    if (currentInput.length === 2 && !currentInput.includes('/')) {
      this.CardDetails.Expiry += '/';
    }

    // Prevent input if length exceeds 5 characters (MM/YY)
    if (currentInput.length >= 5) {
      event.preventDefault();
    }
  }

}
