import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Customer } from '../models/customer.model';
import { PaginatedResponse } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/customers`;

  private readonly customerCreatedSource = new Subject<void>();
  customerCreated$ = this.customerCreatedSource.asObservable();

  readonly #customers = signal<Customer[]>([]);
  customers = this.#customers.asReadonly();

  // GET customers
  getCustomers(
    page: number = 1,
    limit: number = 10,
    searchTerm: string = '',
  ): Observable<PaginatedResponse<Customer>> {
    const params: any = { page: page.toString(), limit: limit.toString(), search: searchTerm };

    if (searchTerm) {
      params.search = searchTerm;
    }

    return this.http
      .get<PaginatedResponse<Customer>>(this.apiUrl, { params })
      .pipe(tap((response) => this.#customers.set(response.data)));
  }

  // POST create customer
  createCustomer(customer: Partial<Customer>): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer).pipe(
      tap((newCustomer) => {
        this.#customers.update((current) => [newCustomer.data, ...current]);
        this.customerCreatedSource.next();
      }),
    );
  }
}
