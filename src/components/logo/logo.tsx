import { PROTECTED_ROUTES } from "@/routes/common/routePath"
import { GalleryVerticalEnd } from "lucide-react"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={PROTECTED_ROUTES.DASHBOARD} className="flex items-center gap-2">
    <div className="bg-green-500 h-6.5 w-6.5 rounded flex items-center justify-center">
    <GalleryVerticalEnd className="size-4" />
    </div>
    <span className="font-semibold text-lg">Fimance</span>
  </Link>
  )
}

export default Logo