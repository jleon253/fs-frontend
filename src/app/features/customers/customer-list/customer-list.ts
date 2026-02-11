import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {
  bootstrapArrowClockwise,
  bootstrapPersonPlus,
  bootstrapSearch,
  bootstrapBoxArrowUpRight,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ToastrService } from 'ngx-toastr';

import { CustomerService } from '../../../core/services/customer.service';
import { PageSizeSelector } from '../../../shared/components/page-size-selector/page-size-selector';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

const CUSTOMER_LIST_ICONS = {
  bootstrapArrowClockwise,
  bootstrapPersonPlus,
  bootstrapSearch,
  bootstrapBoxArrowUpRight,
};

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, NgIconComponent, NgbPaginationModule, PageSizeSelector, TranslatePipe],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
  providers: [provideIcons(CUSTOMER_LIST_ICONS)],
})
export class CustomerList implements OnInit, OnDestroy {
  private readonly customerService = inject(CustomerService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  private readonly sub = new Subscription();
  private readonly searchSubject = new Subject<string>();

  customers = this.customerService.customers;

  page = signal(1);
  pageSize = signal(5);
  totalItems = signal(0);
  searchTerm = signal('');
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadCustomers();
    this.refreshList();
    this.searchConfigure();
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
    this.loadCustomers();
  }

  refreshList(): void {
    const refreshListSub = this.customerService.customerCreated$.subscribe(() => {
      this.page.set(1);
      this.loadCustomers();
    });
    this.sub.add(refreshListSub);
  }

  changePageSize(newSize: number): void {
    this.pageSize.set(newSize);
    this.page.set(1);
    this.loadCustomers();
  }

  searchConfigure(): void {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.searchTerm.set(term);
      this.page.set(1);
      this.loadCustomers();
    });
    this.sub.add(this.searchSubject);
  }

  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.searchSubject.next(element.value);
  }

  loadCustomers(): void {
    this.isLoading.set(true);

    const getCostumerSub = this.customerService
      .getCustomers(this.page(), this.pageSize(), this.searchTerm())
      .subscribe({
        next: (response) => {
          this.totalItems.set(response.meta.total);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.toastr.error('No se pudo conectar con el servidor', 'Error de conexión');
          console.error(err);
        },
      });
    this.sub.add(getCostumerSub);
  }

  navigateToCustomerAccounts(documentNumber: string): void {
    this.router.navigate(['/accounts'], {
      queryParams: { documentNumber },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
