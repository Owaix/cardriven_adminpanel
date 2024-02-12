import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: any[] = [];
  replies: any[] = [];
  uniqueArray: any[] = [];
  destinationId = 640;
  constructor(private service: CarService, private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.service.getcomments(this.destinationId).subscribe((x) => {
      for (let i = 0; i < x.length; i++) {
        let c = x[i];
        let comment = {
          carid: c.carid,
          comment: c.comment,
          commentdate: this.timeAgo(c.commentdate),
          id: c.comid,
          profile_img: c.profile_img,
          name: c.name,
          replies: []
        }

        let reply = {
          id: c.id,
          name: c.repname,
          reply: c.reply,
          replydate: this.timeAgo(c.replydate),
          profile_img: c.repimg,
          commentid: c.commentid
        }

        this.comments.push(comment)
        this.replies.push(reply)
      }

      for (let i = 0; i < this.comments.length; i++) {
        let comment = this.comments[i];
        let com = this.replies.filter(x => x.commentid == comment.id)
        if (com.length > 0) {
          comment.replies.push(com);
        }
      }

      this.uniqueArray = Array.from(
        this.comments.reduce((acc, obj) => {
          const key = JSON.stringify(obj);
          if (!acc.has(key)) {
            acc.set(key, obj);
          }
          return acc;
        }, new Map()).values()
      );
      console.log("uniqueArray");
      console.log(this.uniqueArray);

      this.spinner.hide();
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

  openCommentModal(comment: any) {
    comment.carid = this.destinationId;
    console.log(comment);
    const modalRef = this.modalService.open(CommentmodalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.comment = comment;
  }

  formatComment(comment: string): string {
    if (comment.length > 100) {
      return this.addLink(comment);
    } else {
      return comment;
    }
  }

  openModal() {

  }

  addLink(comment: string): string {
    const textWithBr = comment.replace(/\n/g, '<br>');
    const truncatedText = textWithBr.slice(0, 200);
    return truncatedText + '<a (click)="openModal()" href="#"> ... read more</a>';
  }

}
