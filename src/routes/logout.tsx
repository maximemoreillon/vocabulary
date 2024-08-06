import Button from "~/components/Button"
import { action, createAsync, redirect, useSubmission } from "@solidjs/router"
import { logout } from "~/api/auth"
import { getUserCache } from "~/api"

const logoutAction = action(logout, "logout")

export default function Home() {
  const user = createAsync(() => getUserCache())

  return (
    <>
      <h2 class="text-4xl">Logout</h2>
      <p class="my-4">Logged in as {user()?.username}</p>
      <form action={logoutAction} method="post">
        <Button type="submit">Logout</Button>
      </form>
    </>
  )
}
