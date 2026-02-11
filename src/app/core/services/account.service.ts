import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { Account, TAccountStatus } from '../models/account.model';
import { PaginatedResponse } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/accounts`;

  private readonly accountChangedSource = new Subject<void>();
  accountChanged$ = this.accountChangedSource.asObservable();

  readonly #accounts = signal<Account[]>([]);
  accounts = this.#accounts.asReadonly();

  // GET accounts
  getAccounts(
    page: number = 1,
    limit: number = 5,
    documentNumber?: string,
    accountSearch: string = '',
  ): Observable<PaginatedResponse<Account>> {
    const params: any = { page: page.toString(), limit: limit.toString(), search: accountSearch };

    if (documentNumber) params.document_number = documentNumber;

    return this.http
      .get<PaginatedResponse<Account>>(this.apiUrl, { params })
      .pipe(tap((response) => this.#accounts.set(response.data)));
  }

  // POST create account
  createAccount(documentNumber: string = ''): Observable<any> {
    return this.http.post<any>(this.apiUrl, { document_number: documentNumber }).pipe(
      tap((newAccount) => {
        this.#accounts.update((current) => [newAccount.data, ...current]);
        this.accountChangedSource.next();
      }),
    );
  }

  updateStatus(accountId: string, newStatus: TAccountStatus): Observable<any> {
    return this.http
      .patch<any>(`${this.apiUrl}/${accountId}/status`, { status: newStatus })
      .pipe(tap(() => this.accountChangedSource.next()));
  }

  clearLocalAccounts(): void {
    this.#accounts.set([]);
  }
}
