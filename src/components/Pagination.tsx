import { useSearchParams } from "@solidjs/router"
import { FaSolidArrowLeft, FaSolidArrowRight } from "solid-icons/fa"
import Button from "./Button"
import { defaultPageSize } from "~/config"
type Props = {
  total?: number
}

export default function Pagination(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams()

  const getPaginationOptions = () => {
    const { page = "1", pageSize = defaultPageSize } = searchParams
    return {
      page: Number(page),
      pageSize: Number(pageSize),
    }
  }

  const getPageCount = () =>
    Math.ceil((props.total || 0) / getPaginationOptions().pageSize)

  const canPrevious = () => getPaginationOptions().page > 1
  const canNext = () => getPaginationOptions().page < getPageCount()

  function changePage(direction: number) {
    const { page } = getPaginationOptions()

    setSearchParams({ ...searchParams, page: page + direction })
  }

  return (
    <div class="my-6 flex justify-center gap-8 items-center">
      <Button onclick={() => changePage(-1)} disabled={!canPrevious()}>
        <FaSolidArrowLeft />
      </Button>
      <div>
        {getPaginationOptions().page}/{getPageCount()}
      </div>
      <Button onclick={() => changePage(1)} disabled={!canNext()}>
        <FaSolidArrowRight />
      </Button>
    </div>
  )
}
