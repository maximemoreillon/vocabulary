"use server"

// Following https://github.com/panva/openid-client

import * as client from "openid-client"
import { SessionContent, getSession } from "./auth"
import createJwksClient from "jwks-rsa"
import jwt from "jsonwebtoken"

const { OIDC_AUTHORITY = "", OIDC_CLIENT_ID = "", OIDC_AUDIENCE } = process.env

let config: client.Configuration
let jwksClient: createJwksClient.JwksClient

export async function getConfig() {
  if (!config)
    config = await client.discovery(new URL(OIDC_AUTHORITY), OIDC_CLIENT_ID)

  const jwksUri = config.serverMetadata().jwks_uri

  if (jwksUri) {
    jwksClient = createJwksClient({
      jwksUri,
      cache: true,
      rateLimit: true,
    })
  }

  return config
}

export async function getJwksClient() {
  // If client already exists, just return it
  if (jwksClient) return jwksClient

  const config = await getConfig()
  const jwksUri = config.serverMetadata().jwks_uri

  if (jwksUri) {
    jwksClient = createJwksClient({
      jwksUri,
      cache: true,
      rateLimit: true,
    })
  }

  return jwksClient
}

// Works as action, but not as query
export async function getAuthorizationUrl(origin: string) {
  const config = await getConfig()

  const redirect_uri = `${origin}/api/oauth/callback`
  const scope = "openid email profile"

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
  }

  if (OIDC_AUDIENCE) parameters.audience = OIDC_AUDIENCE

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

  const authurl = client.buildAuthorizationUrl(config, parameters)

  return authurl.toString()
}

// TODO: use only oidc-client
export async function getUserFromToken(token: string) {
  // TODO: use oidc-client instead if possible

  const jwksClient = await getJwksClient()

  const decoded = jwt.decode(token, { complete: true })
  if (!decoded) throw new Error(`Decoded token is null`)

  const kid = decoded.header?.kid
  if (!kid) throw new Error("Missing token kid")

  const key = await jwksClient.getSigningKey(kid)
  try {
    return jwt.verify(token, key.getPublicKey())
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
      data.code_verifier = undefined
      data.code_challenge = undefined
    })
  } catch (error) {
    console.log(error)
  }
}
