"use server"

import * as client from "openid-client"
import { SessionContent, getSession } from "./auth"

const { VITE_OIDC_AUTHORITY, VITE_OIDC_CLIENT_ID } = import.meta.env
const { OIDC_CLIENT_SECRET } = process.env

let config: client.Configuration

export async function getConfig() {
  if (!config)
    config = await client.discovery(
      new URL(VITE_OIDC_AUTHORITY),
      VITE_OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET
    )
  return config
}

export async function oAuthLogin() {
  const config = await getConfig()

  let redirect_uri = "http://localhost:3000/api/oauth/callback"
  let scope = "openid"
  /**
   * PKCE: The following MUST be generated for every redirect to the
   * authorization_endpoint. You must store the code_verifier and state in the
   * end-user session such that it can be recovered as the user gets redirected
   * from the authorization server back to your application.
   */
  let code_verifier: string = client.randomPKCECodeVerifier()
  let code_challenge: string = await client.calculatePKCECodeChallenge(
    code_verifier
  )
  let state!: string

  // CUSTOM ADDITION
  const session = await getSession()
  await session.update((s: SessionContent) => {
    s.code_verifier = code_verifier
    s.code_challenge = code_challenge
    s.state = state
  })
  // END OF CUSTOM ADDITION

  let parameters: Record<string, string> = {
    redirect_uri,
    scope,
    code_challenge,
    code_challenge_method: "S256",
  }

  if (!config.serverMetadata().supportsPKCE()) {
    /**
     * We cannot be sure the server supports PKCE so we're going to use state too.
     * Use of PKCE is backwards compatible even if the AS doesn't support it which
     * is why we're using it regardless. Like PKCE, random state must be generated
     * for every redirect to the authorization_endpoint.
     */
    state = client.randomState()
    parameters.state = state
  }

  return client.buildAuthorizationUrl(config, parameters)
}
