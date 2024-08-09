import { A } from "@solidjs/router"

import { FaSolidArrowLeft } from "solid-icons/fa"

export default function BackLink() {
  return (
    <A
      href="/expressions"
      class="text-primary-500 flex gap-2 items-center my-4"
    >
      <FaSolidArrowLeft />
      <span>Return to my expressions</span>
    </A>
  )
}
