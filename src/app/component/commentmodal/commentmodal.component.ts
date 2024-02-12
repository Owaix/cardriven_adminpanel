import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.scss']
})

export class CommentmodalComponent implements OnInit {

  @Input() comment: any;
  profile_img: string = '';
  reply: string = '';
  IserrorShow: boolean = false;

  constructor(public activeModal: NgbActiveModal, public carservice: CarService) {
    //this.comment.commentdate = this.timeAgo(this.comment.commentdate);  
  }

  ngOnInit(): void {
    this.profile_img = localStorage.getItem("profile_img") || '';
  }

  close() {
    this.activeModal.close();
  }

  save() {
    this.IserrorShow = false;
    if (this.reply == '') {
      this.IserrorShow = true;
      return
    }

    let car = { reply: this.reply, userid: localStorage.getItem("id"), commentid: this.comment.id }
    this.carservice.savereply(car).subscribe((x) => {
      this.activeModal.close();
    });
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