import type { APIEvent } from "@solidjs/start/server"
import * as client from "openid-client"
import { getSession } from "~/lib/auth"
import { getConfig } from "~/lib/oidc"

export async function GET(event: APIEvent) {
  const config = await getConfig()

  const { request } = event

  const url = new URL(request.url)

  const session = await getSession()

  const { code_verifier } = session.data

  const token = await client.authorizationCodeGrant(config, url, {
    pkceCodeVerifier: code_verifier,
  })

  return { token }
}
