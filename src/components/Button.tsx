import { FaSolidCircleNotch } from "solid-icons/fa"
import { JSXElement, Show } from "solid-js"

type Props = {
  href?: string
  onclick?: any
  children?: JSXElement
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
  loading?: boolean
}

const className =
  "rounded px-4 py-2 bg-primary-500 text-dark shadow disabled:opacity-50 inline-flex items-center gap-2 justify-center"
export default function Button(props: Props) {
  return (
    <>
      <Show when={props.href}>
        <a href={props.href} class={className}>
          {props.children}
        </a>
      </Show>
      <Show when={!props.href}>
        <button
          onclick={props.onclick}
          type={props.type}
          disabled={props.disabled || props.loading}
          class={className}
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
