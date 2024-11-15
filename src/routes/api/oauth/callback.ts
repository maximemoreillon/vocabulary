import { redirect } from "@solidjs/router"
import type { APIEvent } from "@solidjs/start/server"
import { oAuthCallback } from "~/lib/oidc"

export async function GET(event: APIEvent) {
  const { url } = event.request
  await oAuthCallback(url)
  return redirect("/")
}
