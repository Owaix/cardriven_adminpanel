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
      x.forEach(v => {
        v.time = this.timeAgo(v.create_date)
      })
      console.log(x);
      this.list = x;
    });

    this.service.updateread().subscribe((x) => {
    });

  }

  redirct(id: string) {
    this.route.navigate(['/component/cardetail/' + id]);
  }

  timeAgo(date: string): string {
    const currentDate = new Date();
    const inputDate = new Date(date);

    const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInMonth = 2592000;

    if (timeDifferenceInSeconds < secondsInMinute) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < secondsInHour) {
      const minutes = Math.floor(timeDifferenceInSeconds / secondsInMinute);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifferenceInSeconds < secondsInDay) {
      const hours = Math.floor(timeDifferenceInSeconds / secondsInHour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifferenceInSeconds < secondsInMonth) {
      const days = Math.floor(timeDifferenceInSeconds / secondsInDay);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      const months = Math.floor(timeDifferenceInSeconds / secondsInMonth);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  }

}
