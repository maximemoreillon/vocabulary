// NOTE: "use server is important here!"
"use server";

import { useUserSession } from "@moreillon/solidstart-oidc";
import { redirect, cache, query } from "@solidjs/router";

export async function getUser() {
  // const session = await useUserSession();
  // return session.data.user;
  return {};
}

export const getUserCache = query(async () => {
  return await getUser();
}, "getUser");
