import { Account } from "./account.model";

export interface Customer {
  id: string;
  document_type: string;
  document_number: string;
  full_name: string;
  email: string;
  created_at?: Date;
  accounts?: Account[];
}
