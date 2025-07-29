import { createAsync } from "@solidjs/router";
// import { getUserCache } from "~/lib/auth";
import LogoutButton from "./LogoutButton";
import Spacer from "./Spacer";
export default function Header() {
  // const user = createAsync(() => getUserCache());

  return (
    <header class="bg-dark-200 text-light flex justify-left items-center px-4 py-4 shadow gap-4">
      <img src="/moreillon_logo.png" alt="" class="h-8" />
      <h1 class="text-2xl">Vocabulary</h1>
      <Spacer />

      {/* {user()?.username && <LogoutButton />} */}
    </header>
  );
}
