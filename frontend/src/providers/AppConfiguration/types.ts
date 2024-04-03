export interface AppOIDCConfig {
  providerUrl: string;
  clientId: string;
}

export interface AppConfiguration {
  baseUrl: string;
  oidc: AppOIDCConfig
}
