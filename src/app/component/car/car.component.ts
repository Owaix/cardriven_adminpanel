import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car, CustomFile, Ddl, techSpecs } from '../../services/Users';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})

export class CarComponent implements OnInit {
  makes: Ddl[] = [];
  models: Ddl[] = [];
  years: Ddl[] = [];
  types: Ddl[] = [];
  variantList: any[] = [];
  moreinfo: boolean = true;
  categoryList: any[] = [];
  selectedFiles: CustomFile[] = [];

  selectedMake: number = 0;
  selectedModel: number = 0;
  selectedYear: number = 0;
  selectedstate: string = '';

  variantID: number = 0;
  type: string = '';
  Engine: string = '';
  efficiency: string = '';
  Transmission: string = '';
  statesList: any[] = [];
  imgList: any[] = [];
  car: Car = new Car();

  statusList = [
    { "id": "s", "name": "Sold" },
    { "id": "r", "name": "Reject" },
    { "id": "p", "name": "Pending" },
    { "id": "a", "name": "Approved" }
  ]

  featureList: any[] = [];
  techSpecs_list: any[] = [];

  constructor(private modalService: NgbModal, private carDataService: CarService, private userService: UserService, private sanitizer: DomSanitizer) { }

  state = '';
  ngOnInit(): void {
    this.carDataService.getMakes().subscribe((makes) => {
      console.log(makes)
      this.makes = makes;
    });

    this.userService.get_profile().subscribe(
      response => {
        let user = response.userData[0];
        this.state = user.state;
      },
      error => {
        alert(error.error.message);
      }
    );

  }

  onMakeChange(obj: any): void {
    this.selectedMake = obj.title;
    this.carDataService.getModels(this.car.makeID).subscribe((models) => {
      this.models = models;
      this.selectedModel = 0; // Reset selected model when make changes
    });
  }

  onModelChange(obj: any): void {
    this.selectedModel = obj.title;
    this.carDataService.getYears(this.car.modelID).subscribe((years) => {
      this.years = years.sort((a, b) => (a.title < b.title ? 1 : -1));
    });
  }

  onYearChange(obj: any): void {
    this.selectedYear = obj.title;

    let category = {
      "make": this.selectedMake,
      "model": this.selectedModel,
      "year": this.selectedYear
    }

    this.carDataService.getCategory(category).subscribe((cat) => {
      this.categoryList = cat;
    });
  }

  onTypeChange(obj: any): void {
    var variant = this.categoryList.find(x => x.title == obj.title);
    this.variantList = this.removeDuplicates(variant.list, 'specs');
  }

  onVarianChange(link: any): void {
    link = link.id;
    this.carDataService.getdetail(link).subscribe((cat) => {
      this.moreinfo = true;
      console.log(this.moreinfo);
      this.type = cat.seating_capacity
      this.Engine = cat.engine_size;
      this.efficiency = cat.fuel_consumption;
      this.Transmission = cat.gear;
      this.featureList = cat.feature_list;
      this.techSpecs_list = cat.techSpecs_list;
      this.variantID = link;      
    });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalContentComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.featureList = this.featureList;  // Pass the ID to the modal component
    modalRef.componentInstance.techSpecs_list = this.techSpecs_list;  // Pass the ID to the modal component
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;

    for (let i = 0; i < this.selectedFiles.length; i++) {
      let fileBase64 = '';
      let file = this.selectedFiles[i];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          fileBase64 = e.target.result;

          let obj = { src: fileBase64 }
          this.carDataService.saveimg(obj).subscribe((cat) => {
            file.CloudFileName = cat.Location;
            this.imgList.push({ src: cat.Location });
          });

        };
        reader.readAsDataURL(file);
      }
    }

  }

  onSubmit(): void {
    console.log('Selected Files:', this.selectedFiles);
  }

  removeFile(file: CustomFile): void {
    let tempList = this.selectedFiles;
    this.selectedFiles = [];
    for (let i = 0; i < tempList.length; i++) {
      let f = tempList[i];
      if (f !== file) {
        this.selectedFiles.push(f);
      }
    }

    let obj = { key: file.CloudFileName }
    this.carDataService.deleteimg(obj).subscribe((cat) => {
      this.imgList = this.imgList.filter(function (el) { return el.src != file.CloudFileName; });
    });
    //this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  getSafeURL(file: File): SafeUrl {
    const url = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onSave(): void {
    if (this.imgList.length == 0) {
      alert('Car must contains atleast one image');
      return;
    }
    let model = {
      "description": this.car.description,
      "state": this.state,
      "variant_id": this.variantID,
      "makeID": this.car.makeID,
      "modelID": this.car.modelID,
      "year": this.car.year,
      "type": this.car.type,
      "negotiable": this.car.isNego,
      "price": this.car.price,
      "mileage": 1200,
      "transmission": 1022,
      "status": this.car.status,
      "image": this.imgList,
      "category": "sedan",
      "variant": "orjen",
      "city": "larkano",
      "parked_near": "dffsd fffsdf"
    }
    console.log(model);
    this.carDataService.savecar(model).subscribe((years) => {
      alert(years.message);
    });
  }

  removeDuplicates(list: any[], prop: string) {
    const uniqueSet = new Set();
    return list.filter(item => {
      const value = item[prop];
      if (!uniqueSet.has(value)) {
        uniqueSet.add(value);
        return true;
      }
      return false;
    });
  }

}
