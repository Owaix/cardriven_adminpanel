import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent {
  constructor(private carDataService: CarService) { }
  arr: any[] = [];

  ngOnInit(): void {
    this.carDataService.transbyuserid().subscribe((makes) => {
      let cumulativeBalance = 0;
      for (let i = 0; i < makes.length; i++) {
        var obj = makes[i];
        obj.debit = '';
        obj.credit = '';
        if (obj.type === 'debit') {
          obj.debit = obj.amount;
          cumulativeBalance -= parseFloat(obj.amount); // Subtract debit amount from cumulative balance
        } else {
          obj.credit = obj.amount;
          cumulativeBalance += parseFloat(obj.amount); // Add credit amount to cumulative balance
        }
        obj.create_date = this.dateformat(obj.create_date);
        obj.balance = cumulativeBalance; // 
        this.arr.push(obj);
      }

      const closingBalanceObj = {
        credit: 'closing balance',
        amount: cumulativeBalance, // Final cumulative balance
        debit: '',
        balance: cumulativeBalance // Same as the final cumulative balance
      };
      this.arr.push(closingBalanceObj);
      console.log(this.arr)
    });
  }

  dateformat(date: string) {
    var d = new Date(date);
    var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    return datestring;
  }

}