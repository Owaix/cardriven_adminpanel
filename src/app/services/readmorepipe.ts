import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'readMore'
})
export class ReadMorePipe implements PipeTransform {
    transform(text: string, limit: number): string {
        if (text.length <= limit) {
            return text;
        }
        return text.substr(0, limit) + '...';
    }
}