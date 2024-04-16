import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ProfilesComponent } from './profile/profiles.component';
import { CarComponent } from './car/car.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CommentsComponent } from './comments/comments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PaymentComponent } from './payment/payment.component';
import { PlansComponent } from './plans/plans.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'list',
				component: ListComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'profile',
				component: ProfilesComponent
			},
			{
				path: 'car',
				component: CarComponent
			},
			{
				path: 'cardetail/:id',
				component: DetailComponent
			},
			{
				path: 'comments',
				component: CommentsComponent
			},
			{
				path: 'transactions',
				component: TransactionsComponent
			},
			{
				path: 'payment',
				component: PaymentComponent
			},
			{
				path: 'plans',
				component: PlansComponent
			}
		]
	}
];
