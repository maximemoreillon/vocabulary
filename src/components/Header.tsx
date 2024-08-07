import { A, createAsync } from "@solidjs/router"
// import { Suspense } from "solid-js"
import { getUserCache } from "~/api"
import LogoutButton from "./LogoutButton"
export default function Header() {
  const user = createAsync(() => getUserCache())

  return (
    <>
      {user()?.username ? (
        <header class="bg-dark-200 text-light flex justify-between items-center px-4 py-4 shadow">
          <h1 class="text-xl">Vocabulary</h1>

          {/*  <nav class="flex gap-4">
            <A href="/expressions">List</A>
            <A href="/expressions/random">Random</A>
            <A href="/about">About</A>
            <A href="/logout">Logout</A> 
          </nav>*/}
          <LogoutButton />
        </header>
      ) : null}
    </>
  )
}
