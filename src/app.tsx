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
          <Title>Vocabulary</Title>
          <Suspense>
            <Header />
            <main class="max-w-5xl mx-auto p-4">{props.children}</main>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
