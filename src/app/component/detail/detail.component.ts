import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { SlideInterface } from '../slidercomponent/slidercomponent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  destinationId: number = 0;
  car: any = [];
  slides: SlideInterface[] = [];
  currentIndex: number = 0;
  featureList: any[] = [];
  techSpecs_list: any[] = [];
  uniqueArray: any[] = [];

  comments = [
    { username: 'User1', date: '2024-02-02' },
    { username: 'User2', date: '2024-02-03' },
    // Add more comments as needed
  ];

  constructor(private route: ActivatedRoute, private service: CarService, private modalService: NgbModal, private spinnerService: SpinnerService) {
    this.route.params.subscribe(params => {
      this.destinationId = params['id'];

      this.service.getcardetail(this.destinationId).subscribe((x) => {
        console.log(x);
        for (let i = 0; i < x.img_list.length; i++) {
          this.slides.push({ url: x.img_list[i], title: "" })
        }
        this.car = x;
        this.featureList = x.feature_list;
        this.techSpecs_list = x.techSpecs_list;

        let comments: any[] = []
        let replies: any[] = []

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

            comments.push(comment)
            replies.push(reply)
          }

          for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            let com = replies.filter(x => x.commentid == comment.id)
            if (com.length > 0) {
              comment.replies.push(com);
            }
          }

          console.log(comments);

          this.uniqueArray = Array.from(
            comments.reduce((acc, obj) => {
              const key = JSON.stringify(obj);
              if (!acc.has(key)) {
                acc.set(key, obj);
              }
              return acc;
            }, new Map()).values()
          );
          console.log("uniqueArray");
          console.log(this.uniqueArray);

        });

      });
    });
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(ModalContentComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.featureList = this.featureList;  // Pass the ID to the modal component
    modalRef.componentInstance.techSpecs_list = this.techSpecs_list;  // Pass the ID to the modal component
  }

  startLoading() {
    this.spinnerService.show();

    // Simulate some async operation
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }

  openCommentModal(comment: any) {
    comment.carid = this.destinationId;
    console.log(comment);
    const modalRef = this.modalService.open(CommentmodalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.comment = comment;
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
