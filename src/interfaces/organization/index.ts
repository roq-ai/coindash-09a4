import { CryptoMarketingServiceInterface } from 'interfaces/crypto-marketing-service';
import { ServicePlanInterface } from 'interfaces/service-plan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  crypto_marketing_service?: CryptoMarketingServiceInterface[];
  service_plan?: ServicePlanInterface[];
  user?: UserInterface;
  _count?: {
    crypto_marketing_service?: number;
    service_plan?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
