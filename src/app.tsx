import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <header>
            <nav class="flex gap-4 p-2">
              <a href="/">Home</a>
              <a href="/expressions">List</a>
              <a href="/expressions/random">Random</a>
              <a href="/about">About</a>
              <a href="/login">Login</a>
            </nav>
          </header>
          <main class="max-w-5xl mx-auto">
            <Suspense>{props.children}</Suspense>
          </main>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
