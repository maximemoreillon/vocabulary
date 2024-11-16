/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DB_URL: string
  SESSION_SECRET: string
  APP_USERNAME: string
  APP_PASSWORD: string
  // OIDC
  OIDC_AUTHORITY: string
  OIDC_AUDIENCE: string
  OIDC_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
