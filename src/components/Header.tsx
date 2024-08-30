import { createAsync } from "@solidjs/router"
import { getUserCache } from "~/lib/auth"
import LogoutButton from "./LogoutButton"
export default function Header() {
  const user = createAsync(() => getUserCache())

  return (
    <header class="bg-dark-200 text-light flex justify-between items-center px-4 py-4 shadow">
      <h1 class="text-2xl">Vocabulary</h1>

      {user()?.username ? <LogoutButton /> : null}
    </header>
  )
}
