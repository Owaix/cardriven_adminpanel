import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { SlideInterface } from '../slidercomponent/slidercomponent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
// import { SpinnerService } from 'src/app/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private service: CarService,
    private modalService: NgbModal) {
    this.startLoading();
    this.route.params.subscribe(params => {
      this.destinationId = params['id'];
      let id = localStorage.getItem('id');
      this.service.getcardetail(this.destinationId, id).subscribe((x) => {
        console.log(x);
        for (let i = 0; i < x.img_list.length; i++) {
          this.slides.push({ url: x.img_list[i], title: "" })
        }

        this.car = x;
        this.featureList = x.feature_list;
        this.techSpecs_list = x.techSpecs_list;
        this.spinner.hide();
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
    this.spinner.show();
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }


}
