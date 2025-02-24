import Link from "next/link"
import { Button } from "./button"

export const Header = () => {
  return (
    <div className="h-16 p-2 bg-amber-600">
      <Link href="/">
        <Button variant="link"> Flashlink </Button>{" "}
      </Link>
    </div>
  )
}
