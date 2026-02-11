import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-size-selector',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './page-size-selector.html',
  styleUrl: './page-size-selector.scss',
})
export class PageSizeSelector {
  pageSize = input.required<number>();
  options = input<number[]>([5, 10, 25, 50]);

  sizeChange = output<number>();

  onSizeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.sizeChange.emit(Number(value));
  }
}
