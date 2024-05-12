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
    console.log(this.comment);
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


}