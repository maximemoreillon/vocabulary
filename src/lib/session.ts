import { useSession } from "vinxi/http"

const { SESSION_SECRET = "areallylongsecretthatyoushouldreplace" } = process.env

export async function getSession() {
  const session = await useSession({
    password: SESSION_SECRET,
  })

  return session
}
