import { AxiosResponse } from "axios";

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface CreateAccessToken {
    create: (code: string) => Promise<AxiosResponse<AccessToken>>;
}

