import { A, createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"
import { getUserCache } from "~/api"

export default function Header() {
  const user = createAsync(() => getUserCache())

  return (
    <header class="bg-primary text-light flex justify-between items-center px-4 py-4 shadow">
      <h1 class="text-xl">Vocabulary</h1>

      <nav class="flex gap-4">
        <A href="/expressions">List</A>
        <A href="/expressions/random">Random</A>
        <A href="/about">About</A>

        {/* Suspense needed otherwise wrong value in initial display */}
        <Suspense>
          {user()?.username ? (
            <A href="/logout">Logout</A>
          ) : (
            <A href="/login">Login</A>
          )}
        </Suspense>
      </nav>
    </header>
  )
}
