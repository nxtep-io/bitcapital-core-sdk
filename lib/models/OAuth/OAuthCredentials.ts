import { BaseModel, BaseModelSchema } from "..";

export interface OAuthCredentialsSchema extends BaseModelSchema {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  user_id?: string;
  virtual?: boolean;
  scope: string[];
}

export default class OAuthCredentials extends BaseModel implements OAuthCredentialsSchema {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  user_id?: string;
  virtual?: boolean;
  scope: string[];

  constructor(data: Partial<OAuthCredentialsSchema>) {
    super(data);

    Object.assign(this, data);
  }
}
