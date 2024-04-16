import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { ProfilesComponent } from './profile/profiles.component';
import { CarComponent } from './car/car.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SlidercomponentComponent } from './slidercomponent/slidercomponent.component';
import { CommentmodalComponent } from './commentmodal/commentmodal.component';
import { NgxEditorModule } from 'ngx-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommentsComponent } from './comments/comments.component';
import { NumberFormatDirective } from '../services/numberdirective';
import { TransactionsComponent } from './transactions/transactions.component';
import { PaymentComponent } from './payment/payment.component';
import { PlansComponent } from './plans/plans.component';
import { CreditCardDirective, MmYyDateDirective } from '../services/card-mask.directive'; // Import your pipe here

@NgModule({
  declarations: [
    CreditCardDirective,MmYyDateDirective,
    NumberFormatDirective, ProfilesComponent, CarComponent, ModalContentComponent, ListComponent, DetailComponent, SlidercomponentComponent, CommentmodalComponent, CommentsComponent, TransactionsComponent, PaymentComponent, PlansComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxEditorModule,
    NgxSpinnerModule,
  ],
})

export class ComponentsModule { }
