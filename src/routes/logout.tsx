import Button from "~/components/Button"
import { action, redirect, useSubmission } from "@solidjs/router"
import { logout } from "~/api/auth"

const logoutAction = action(logout, "logout")

export default function Home() {
  return (
    <>
      <h1>Logout</h1>
      <form action={logoutAction} method="post">
        <Button type="submit">Logout</Button>
      </form>
    </>
  )
}
