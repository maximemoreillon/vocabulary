// NOTE: "use server is important here!"
"use server";

import { useUserSession } from "@moreillon/solidstart-oidc";
import { query } from "@solidjs/router";

const { OIDC_USER_ID_FIELD = "sub" } = process.env;

export async function getUser() {
  const session = await useUserSession();
  return session.data.user;
}

// Currently unused
export const getUserCache = query(async () => {
  return await getUser();
}, "getUser");

export async function getUserId() {
  const user = await getUser();
  return user[OIDC_USER_ID_FIELD];
}
