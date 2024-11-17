// Currently used because cannot seem to be able to set sessions data unless action
import { redirect } from "@solidjs/router"
import type { APIEvent } from "@solidjs/start/server"
import { getAuthorizationUrl } from "~/lib/oidc"

export async function GET(event: APIEvent) {
  const { url } = event.request
  const { origin } = new URL(url)
  const authUrl = await getAuthorizationUrl(origin)
  return redirect(authUrl)
  // return origin
}
