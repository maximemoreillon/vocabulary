import { FaSolidCircleNotch } from "solid-icons/fa"
import { createSignal, JSX, JSXElement, Show } from "solid-js"

type Props = {
  href?: string
  children?: JSXElement
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
  loading?: boolean
  class?: string
  onclick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
  size?: string
  variant?: string
}

export default function Button(props: Props) {
  const baseClass =
    "rounded bg-primary-200 text-light shadow disabled:opacity-50 inline-flex items-center gap-2 justify-center"

  let sizeClasses = "px-4 py-2"

  switch (props.size) {
    case "sm":
      sizeClasses = "px-2 py-1"
      break

    default:
      break
  }

  const getClass = () => `${baseClass} ${sizeClasses} ${props.class}`

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
