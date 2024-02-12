import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumberFormat]'
})
export class NumberFormatDirective {

    @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        const decimalSeparator = '.';
        const thousandsSeparator = ',';

        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator); // Add thousands separator
        }

        input.value = value;
    }

}