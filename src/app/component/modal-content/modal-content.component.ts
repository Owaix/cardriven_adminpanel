import { Component, Input, OnInit } from '@angular/core';
import { techSpecs } from '../../services/Users';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  accordionStates: boolean[] = [];
  showDiv: boolean = false;
  showDivs: boolean = false;

  @Input() techSpecs_list: techSpecs[] = [];
  @Input() featureList: string[] = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleAccordion(index: number): void {
    this.accordionStates[index] = !this.accordionStates[index];
  }

  toggleDiv(): void {
    this.showDiv = !this.showDiv;
  }

  toggleDivs(): void {
    this.showDivs = !this.showDivs;
  }
}
