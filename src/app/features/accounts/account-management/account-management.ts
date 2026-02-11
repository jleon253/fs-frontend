import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';

import { CustomerService } from '../../../core/services/customer.service';
import { AccountService } from '../../../core/services/account.service';
import { PageSizeSelector } from '../../../shared/components/page-size-selector/page-size-selector';
import { AccountRowCard } from '../../../shared/components/account-row-card/account-row-card';
import { CustomerMiniCard } from '../../../shared/components/customer-mini-card/customer-mini-card';
import { TranslatePipe } from '@ngx-translate/core';

const ACCOUNT_MANAGEMENT_ICONS = {
  bootstrapSearch
};

@Component({
  selector: 'app-account-management',
  imports: [NgbPagination, PageSizeSelector, AccountRowCard, CustomerMiniCard, NgIconComponent, TranslatePipe],
  templateUrl: './account-management.html',
  styleUrl: './account-management.scss',
  providers: [provideIcons(ACCOUNT_MANAGEMENT_ICONS)],
})
export class AccountManagement implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly customerService = inject(CustomerService);
  private readonly accountService = inject(AccountService);

  customers = this.customerService.customers;
  accounts = this.accountService.accounts;

  private readonly sub = new Subscription();

  private readonly customerSearchSubject = new Subject<string>();
  private readonly accountSearchSubject = new Subject<string>();

  @ViewChildren('customerCard') customerCards!: QueryList<ElementRef>;

  // State
  selectedDocumentNumber = signal<string | null>(null);
  isCreatingAccount = signal(false);

  page = signal(1);
  pageSize = signal(5);
  totalItems = signal(0);
  isSearching = signal(false);
  isLoading = signal(false);
  accountSearchTerm = signal('');

  ngOnInit() {
    this.getDocumentNumberFromUrl();
    this.loadCostumers();
    this.loadAccounts();
    this.customerSearchConfigure();
    this.accountSearchConfigure();
    this.listenAccountService();
  }

  selectCustomer(documentNumber: string) {
    const newSelection = this.selectedDocumentNumber() === documentNumber ? null : documentNumber;

    this.selectedDocumentNumber.set(newSelection);
    this.page.set(1);
    this.loadAccounts();
  }

  getDocumentNumberFromUrl() {
    const idFromUrl = this.route.snapshot.queryParamMap.get('documentNumber');
    if (idFromUrl) {
      this.selectedDocumentNumber.set(idFromUrl);
    }

    if (this.selectedDocumentNumber()) {
      this.scrollToSelectedCustomer();
    }
  }

  loadCostumers() {
    const getCustomerSub = this.customerService.getCustomers(1, 100).subscribe();
    this.sub.add(getCustomerSub);
  }

  loadAccounts() {
    this.isLoading.set(true);

    const getAccountSub = this.accountService
      .getAccounts(
        this.page(),
        this.pageSize(),
        this.selectedDocumentNumber() || undefined,
        this.accountSearchTerm(),
      )
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
    this.sub.add(getAccountSub);
  }

  createAccount() {
    if (!this.selectedDocumentNumber()) {
      this.toastr.warning('Selecciona un cliente primero, antes de registrar una cuenta.');
      return;
    }

    this.isCreatingAccount.set(true);

    const postAccountSub = this.accountService
      .createAccount(this.selectedDocumentNumber()?.toString())
      .subscribe({
        next: () => {
          this.toastr.success('Cuenta bancaria registrada con éxito');
          this.isCreatingAccount.set(false);
          this.loadAccounts();
        },
        error: () => {
          this.isCreatingAccount.set(false);
          this.toastr.error('Error registrando la nueva cuenta');
        },
      });
    this.sub.add(postAccountSub);
  }

  private scrollToSelectedCustomer() {
    setTimeout(() => {
      const selectedDocNumber = this.selectedDocumentNumber();
      if (!selectedDocNumber) return;

      const target = this.customerCards.find(
        (card) => card.nativeElement.getAttribute('data-doc') === selectedDocNumber,
      );

      if (target) {
        target.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  }

  onCustomerSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.customerSearchSubject.next(value);
  }

  private performCustomerSearch(term: string) {
    this.isSearching.set(true);
    const getCustomerSub = this.customerService.getCustomers(1, 50, term).subscribe({
      next: () => this.isSearching.set(false),
      error: () => this.isSearching.set(false),
    });

    this.sub.add(getCustomerSub);
  }

  customerSearchConfigure(): void {
    this.customerSearchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performCustomerSearch(searchTerm);
      });

    this.sub.add(this.customerSearchSubject);
  }

  onAccountSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.accountSearchSubject.next(value);
  }

  accountSearchConfigure(): void {
    this.accountSearchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
      this.accountSearchTerm.set(term);
      this.page.set(1);
      this.loadAccounts();
    });

    this.sub.add(this.accountSearchSubject);
  }

  listenAccountService(): void {
    const accountListenSub = this.accountService.accountChanged$.subscribe(() => {
      this.loadAccounts();
    });

    this.sub.add(accountListenSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
