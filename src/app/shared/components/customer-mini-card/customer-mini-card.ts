import { Component, computed, input, output } from '@angular/core';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-mini-card',
  imports: [],
  templateUrl: './customer-mini-card.html',
  styleUrl: './customer-mini-card.scss',
})
export class CustomerMiniCard {
  customer = input.required<Customer>();
  isSelected = input<boolean>(false);
  selectCustomer = output<string>();

  initials = computed(() => {
    return this.customer()
      .full_name.split(' ')
      .map((name) => name[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  });

  onCardClick(event: Event) {
    event.stopPropagation(); // Evitamos efectos colaterales
    this.selectCustomer.emit(this.customer().document_number);
  }
}
