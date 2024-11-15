"use server"

// Following https://github.com/panva/openid-client

import * as client from "openid-client"
import { SessionContent, getSession } from "./auth"
import createJwksClient from "jwks-rsa"
import jwt from "jsonwebtoken"

const {
  VITE_OIDC_AUTHORITY,
  VITE_OIDC_CLIENT_ID,
  VITE_OIDC_JWKS_URI,
  VITE_OIDC_AUDIENCE,
} = import.meta.env
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

// TODO: use only oidc-client
const jwksClient = createJwksClient({
  jwksUri: VITE_OIDC_JWKS_URI, // TODO: get from oidc-client
  cache: true,
  rateLimit: true,
})

export async function oAuthLogin(windowLocationOrigin: string) {
  const config = await getConfig()

  const redirect_uri = `${windowLocationOrigin}/api/oauth/callback`
  const scope = "openid email profile offline_access"
  /**
   * PKCE: The following MUST be generated for every redirect to the
   * authorization_endpoint. You must store the code_verifier and state in the
   * end-user session such that it can be recovered as the user gets redirected
   * from the authorization server back to your application.
   */
  const code_verifier: string = client.randomPKCECodeVerifier()
  const code_challenge: string = await client.calculatePKCECodeChallenge(
    code_verifier
  )

  const parameters: Record<string, string> = {
    redirect_uri,
    scope,
    code_challenge,
    code_challenge_method: "S256",
    audience: VITE_OIDC_AUDIENCE,
  }

  // TODO: figure out what to do with this
  let state!: string

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

  const session = await getSession()
  await session.update((d: SessionContent) => {
    d.code_verifier = code_verifier
    d.code_challenge = code_challenge
    d.state = state
  })

  return client.buildAuthorizationUrl(config, parameters)
}

export async function getUserFromToken(token: string) {
  // TODO: use oidc-client instead

  const decoded = jwt.decode(token, { complete: true })
  if (!decoded) return null //throw new Error(`Decoded token is null`)

  const kid = decoded.header?.kid
  if (!kid) throw new Error("Missing token kid")

  const key = await jwksClient.getSigningKey(kid)
  try {
    const user = jwt.verify(token, key.getPublicKey())
    return user
  } catch (error) {
    return null
  }
}

export async function oAuthCallback(url: string) {
  const config = await getConfig()

  const session = await getSession()

  const { code_verifier } = session.data

  try {
    const result = await client.authorizationCodeGrant(config, new URL(url), {
      pkceCodeVerifier: code_verifier,
    })

    const { access_token, refresh_token } = result

    await session.update((data) => {
      data.access_token = access_token
      data.refresh_token = refresh_token
    })
  } catch (error) {
    console.log(error)
  }
}
