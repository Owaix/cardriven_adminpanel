import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car, CustomFile, Ddl, techSpecs } from '../../services/Users';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  submodels: Ddl[] = [];
  variantList: any[] = [];
  moreinfo: boolean = true;
  categoryList: any[] = [];
  selectedFiles: CustomFile[] = [];
  userDataSubscription: Subscription | undefined;

  isTypeEmpty: boolean = false;
  isPriceEmpty: boolean = false;
  isSubModel: boolean = false;
  selectedMake: number = 0;
  selectedModel: number = 0;
  selectedSubModel: number = 0;
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
  isAllow: boolean = false;
  statusList = [
    // { "id": "s", "name": "Sold" },
    // { "id": "r", "name": "Reject" },
    { "id": "p", "name": "Pending" },
    // { "id": "a", "name": "Approved" }
  ]

  featureList: any[] = [];
  techSpecs_list: any[] = [];

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private modalService: NgbModal,
    private carDataService: CarService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  state = '';

  editor: Editor = new Editor();
  html = 'OWAIS';

  //create a cronjob for delist all listed cars

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.userDataSubscription = this.carDataService.getinventory_level(id).subscribe((list) => {
      if (list.length == 0) {
        alert('You are not currently enroll the any plan.');
        this.router.navigate(['/component/plans']);
      }
    });

    this.editor = new Editor();
    this.userDataSubscription = this.carDataService.getMakes().subscribe((makes) => {
      console.log(makes)
      this.makes = makes;
    });

    this.userDataSubscription = this.userService.get_profile(id).subscribe(
      response => {
        let user = response.userData[0];
        this.state = user.state;
      },
      error => {
        alert(error.error.message);
      }
    );
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }

    if (charCode === 46 && event.target.value.includes('.')) {
      return false;
    }

    return true;
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    this.editor.destroy();
  }

  onMakeChange(obj: any): void {
    this.selectedMake = obj.title;
    this.carDataService.getModels(this.car.makeID).subscribe((models) => {
      this.models = models;
      console.log(this.models);
      this.selectedModel = 0; // Reset selected model when make changes
    });
  }

  onModelChange(obj: any): void {
    if (obj.submodel > 0) {
      this.isSubModel = true;
      this.selectedModel = obj.title;
      this.carDataService.getsubModels(this.car.modelID).subscribe((sub) => {
        this.submodels = sub;
      });
    } else {
      this.isSubModel = false;
      this.selectedModel = obj.title;
      this.carDataService.getYears(this.car.modelID).subscribe((years) => {
        this.years = years.sort((a, b) => (a.title < b.title ? 1 : -1));
      });
    }
  }

  onSubModelChange(obj: any): void {
    console.log(this.car.SubmodelID);
    this.selectedSubModel = obj.title;
    this.carDataService.getYears(this.car.SubmodelID).subscribe((years) => {
      this.years = years.sort((a, b) => (a.title < b.title ? 1 : -1));
    });
  }

  onYearChange(obj: any): void {
    this.selectedYear = obj.title;

    let category = {
      "make": this.selectedMake,
      "model": this.selectedSubModel == 0 ? this.selectedModel : this.selectedSubModel,
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
    console.log(link);
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

    let id = localStorage.getItem('id');
    this.carDataService.getinventory_level(id).subscribe((list) => {
      if (list.length > 0) {
        let obj = list[0];
        if (obj.items == obj.toitems) {
          alert('You are not currently enroll the any plan.');
          return;
        }
      }
    });

    let msg = "";
    this.isPriceEmpty = false;
    this.isTypeEmpty = false;
    if (this.imgList.length == 0) {
      msg = 'Car must contains atleast one image\n';
    }
    if (this.car.type == "") {
      msg += 'Please select type\n';
      this.isTypeEmpty = true;
    }
    if (this.car.price == "") {
      msg += 'Please enter price';
      this.isPriceEmpty = true;
    }
    if (msg != "") {
      alert(msg);
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
      "parked_near": "dffsd fffsdf",
      "identifier": this.car.identifier,
      "Driveaway": this.car.Driveaway
    }
    console.log(model);
    this.carDataService.savecar(model).subscribe((years) => {
      Swal.fire({
        title: "Saved",
        text: "Car Has been created successfully",
        icon: "success"
      });
      this.router.navigate(['/component/list']);
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
