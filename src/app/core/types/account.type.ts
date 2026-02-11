export enum EAccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export type TAccountStatus = EAccountStatus.ACTIVE | EAccountStatus.INACTIVE;