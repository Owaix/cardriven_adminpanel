import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CustomFile, Ddl, techSpecs } from '../../services/Users';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})

export class CarComponent implements OnInit {
  makes: Ddl[] = [];
  models: Ddl[] = [];
  years: Ddl[] = [];

  categoryList: any[] = [];
  selectedFiles: CustomFile[] = [];

  selectedMake: number = 0;
  selectedModel: number = 0;
  selectedYear: number = 0;

  type: string = '';
  Engine: string = '';
  efficiency: string = '';
  Transmission: string = '';
  featureList: string[] = [];

  showDiv: boolean = false;
  showDivs: boolean = false;
  techSpecs_list: techSpecs[] = [];
  accordionStates: boolean[] = [];

  constructor(private carDataService: CarService, private sanitizer: DomSanitizer) { }

  toggleDiv(): void {
    this.showDiv = !this.showDiv;
  }

  toggleAccordion(index: number): void {
    this.accordionStates[index] = !this.accordionStates[index];
  }

  toggleDivs(): void {
    this.showDivs = !this.showDivs;
  }

  ngOnInit(): void {
    this.carDataService.getMakes().subscribe((makes) => {
      console.log(makes)
      this.makes = makes;
    });
  }

  onMakeChange(): void {
    this.carDataService.getModels(this.selectedMake).subscribe((models) => {
      this.models = models;
      this.selectedModel = 0; // Reset selected model when make changes
    });
  }

  onModelChange(): void {
    this.carDataService.getYears(this.selectedModel).subscribe((years) => {
      this.years = years;
    });
  }

  onYearChange(): void {

    let category = {
      "make": "toyota",
      "model": "Corolla",
      "year": 2020
    }

    this.carDataService.getCategory(category).subscribe((cat) => {
      this.categoryList = cat;
    });
  }

  show(link: number): void {
    this.carDataService.getdetail(link).subscribe((cat) => {
      this.type = cat.seating_capacity
      this.Engine = cat.engine_size;
      this.efficiency = cat.fuel_consumption;
      this.Transmission = cat.gear;
      this.featureList = cat.feature_list;
      this.techSpecs_list = cat.techSpecs_list;
      console.log(cat)
    });
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
        };
        reader.readAsDataURL(file);
      }

      let obj = { src: fileBase64 }
      this.carDataService.saveimg(obj).subscribe((cat) => {
        file.CloudFileName = cat.Location;
      });
      console.log(file)
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
      console.log(cat);
    });
    //this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  getSafeURL(file: File): SafeUrl {
    const url = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
