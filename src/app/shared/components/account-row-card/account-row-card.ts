import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { Account, EAccountStatus, TAccountStatus } from '../../../core/models/account.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../core/services/account.service';
import { Subscription } from 'rxjs';
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { bootstrapCheckCircle, bootstrapCopy, bootstrapThreeDotsVertical, bootstrapXCircle } from '@ng-icons/bootstrap-icons';

const ACCOUNT_ROW_CARD_ICONS = {
  bootstrapThreeDotsVertical,
  bootstrapCheckCircle,
  bootstrapXCircle,
  bootstrapCopy
};

@Component({
  selector: 'app-account-row-card',
  imports: [NgIconComponent],
  templateUrl: './account-row-card.html',
  styleUrl: './account-row-card.scss',
  providers: [provideIcons(ACCOUNT_ROW_CARD_ICONS)],
})
export class AccountRowCard implements OnDestroy {
  accountStatus = EAccountStatus;
  account = input.required<Account>();

  private readonly clipboard = inject(Clipboard);
  private readonly accountService = inject(AccountService);
  private readonly toastr = inject(ToastrService);

  private readonly sub = new Subscription();

  isUpdating = signal(false);

  copyToClipboard() {
    this.clipboard.copy(this.account().account_number.toString());
    this.toastr.info('Número de cuenta copiado al portapapeles', 'Copiado');
  }

  toggleStatus(newStatus: TAccountStatus) {
    this.isUpdating.set(true);
    const updateStatusSub = this.accountService
      .updateStatus(this.account().id, newStatus)
      .subscribe({
        next: () => {
          this.toastr.success(
            `Cuenta ${newStatus === EAccountStatus.ACTIVE ? 'activada' : 'inactivada'} correctamente`,
          );
          this.isUpdating.set(false);
        },
        error: () => {
          this.toastr.error('Error al cambiar el estado de la cuenta');
          this.isUpdating.set(false);
        },
      });

    this.sub.add(updateStatusSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
