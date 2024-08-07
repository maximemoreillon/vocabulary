import { cache } from "@solidjs/router"
import { getUser } from "~/api/auth"

export const getUserCache = cache(
  async (redirect: boolean = false) => getUser(redirect),
  "getUser"
)
