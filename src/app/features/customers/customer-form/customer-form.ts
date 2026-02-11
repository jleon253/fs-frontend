import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { bootstrapPersonFillAdd, bootstrapXCircle } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { t } from '../../../../utils/i18n';

import { CustomerService } from '../../../core/services/customer.service';

const CUSTOMER_FORM_ICONS = {
  bootstrapPersonFillAdd,
  bootstrapXCircle,
};

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, TranslatePipe],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
  providers: [provideIcons(CUSTOMER_FORM_ICONS)],
})
export class CustomerForm {
  MIN_CHAR_DOC_NUM = 10;
  MIN_CHAR_NAME = 3;

  private readonly fb = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  private readonly toastr = inject(ToastrService);

  isSubmiting = signal(false);

  customerForm = this.fb.group({
    document_type: ['', [Validators.required]],
    document_number: ['', [Validators.required, Validators.minLength(10)]],
    full_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.customerForm.invalid || this.isSubmiting()) return;

    this.isSubmiting.set(true);

    this.customerService.createCustomer(this.customerForm.value as any).subscribe({
      next: (res) => {
        this.toastr.success(
          t('toast_msg.success.customer_register', { name: res.data.full_name }),
          t('toast_msg.success.title'),
        );
        this.customerForm.reset({ document_type: '' });
        this.isSubmiting.set(false);
      },
      error: (err) => {
        this.isSubmiting.set(false);
        this.toastr.error(
          err.error?.message || t('toast_msg.error.customer_register'),
          t('toast_msg.error.title'),
        );
      },
    });
  }
}
