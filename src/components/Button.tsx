import { FaSolidCircleNotch } from "solid-icons/fa"
import { createSignal, JSXElement, Show } from "solid-js"

type Props = {
  href?: string
  onclick?: any
  children?: JSXElement
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
  loading?: boolean
  class?: string
}

export default function Button(props: Props) {
  const [getBaseClass, setBaseClass] = createSignal(
    "rounded px-4 py-2 bg-primary-500 text-dark shadow disabled:opacity-50 inline-flex items-center gap-2 justify-center"
  )

  const getClass = () => `${getBaseClass()} ${props.class}`

  return (
    <>
      <Show when={props.href}>
        <a href={props.href} class={getClass()}>
          {props.children}
        </a>
      </Show>
      <Show when={!props.href}>
        <button
          onclick={props.onclick}
          type={props.type}
          disabled={props.disabled || props.loading}
          class={getClass()}
        >
          <Show when={props.loading}>
            <FaSolidCircleNotch class="animate-spin" />
          </Show>

          <Show when={!props.loading}>{props.children}</Show>
        </button>
      </Show>
    </>
  )
}
