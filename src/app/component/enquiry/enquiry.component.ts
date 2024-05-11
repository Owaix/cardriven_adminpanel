import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})

export class EnquiryComponent implements OnInit {

  list: any[] = [];
  make = '';
  model = '';
  url = '';
  msg = '';
  vehicle_id = '';
  constructor(private service: CarService, private route: Router
  ) { }

  ngOnInit(): void {
    this.service.getenquiry().subscribe((x) => {
      x.forEach(x => {
        x.last_message_content = x.last_message_content.replace('"', '').substring(0, 20) + ' ...';
      })
      console.log(x);
      this.list = x;
    });
  }

  messages(user_id: number): void {
    this.service.getenquirybyid(user_id).subscribe((x) => {
      this.make = x[0].make;
      this.model = x[0].model;
      this.url = x[0].url;
      this.msg = x[0].msg;
      this.vehicle_id = x[0].vehicle_id;
    });
  }

  redirct(id: string) {
    this.route.navigate(['/component/cardetail/' + id]);
  }

}
