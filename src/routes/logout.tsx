import Button from "~/components/Button"
import { action, createAsync, redirect, useSubmission } from "@solidjs/router"
import { logout } from "~/api/auth"
import { getUserCache } from "~/api"
import { Title } from "@solidjs/meta"

const logoutAction = action(logout, "logout")

export default function Home() {
  const user = createAsync(() => getUserCache())

  return (
    <>
      <Title>Not About</Title>
      <h2 class="text-6xl">Logout</h2>
      <p class="my-8">Logged in as {user()?.username}</p>
      <form action={logoutAction} method="post">
        <Button type="submit">Logout</Button>
      </form>
    </>
  )
}
