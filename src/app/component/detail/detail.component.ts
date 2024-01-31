import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  destinationId: number = 0;

  constructor(private route: ActivatedRoute) {
    // Get the ID from the route parameters
    this.route.params.subscribe(params => {
      this.destinationId = params['id'];
    });
  }
}
