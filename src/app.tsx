import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import Header from "./components/Header"

// Used to import tailwind
import "./app.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <Header />

          <main class="max-w-5xl mx-auto p-5">
            <Suspense>{props.children}</Suspense>
          </main>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
