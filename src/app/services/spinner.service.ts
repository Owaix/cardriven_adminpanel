import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SpinnerService {
    private showSpinner = new BehaviorSubject<boolean>(false);
    public showSpinner$ = this.showSpinner.asObservable();

    show() {
        this.showSpinner.next(true);
    }

    hide() {
        this.showSpinner.next(false);
    }
}