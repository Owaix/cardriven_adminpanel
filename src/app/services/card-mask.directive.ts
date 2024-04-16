
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[creditCardMask]'
})

export class CreditCardDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '').replace(/\D/g, ''); // Remove non-numeric characters
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }
    let numbers: any[] = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }
    input.value = numbers.join(' ');
  }
}

@Directive({
  selector: '[appMmYyDate]'
})
export class MmYyDateDirective {
  private formattedValue: string = '';

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const isNumber = /\d/.test(inputChar);
    const isSlash = inputChar === '/';

    // Allow backspace, slash, and numbers only
    if (!isNumber && !isSlash && event.keyCode !== 8) {
      event.preventDefault();
      return;
    }

    // Update formatted value based on keypress
    this.formattedValue = this.formatInput(this.el.nativeElement.value + inputChar);

    // Update input element with formatted value
    this.el.nativeElement.value = this.formattedValue;
  }

  private formatInput(value: string): string {
    const month = value.slice(0, 2);
    const year = value.slice(3);

    return month.length > 2 ? month.slice(0, 2) : month + '/' + year.slice(0, 2);
  }
}