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

@NgModule({
  declarations: [
    ProfilesComponent, CarComponent, ModalContentComponent, ListComponent, DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ],
})

export class ComponentsModule { }
