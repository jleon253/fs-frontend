export enum EAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type TAccountStatus = EAccountStatus.ACTIVE | EAccountStatus.INACTIVE;

export interface Account {
  id: string;
  customer_id: string;
  account_number: number;
  status: TAccountStatus;
  created_at?: Date;
}
