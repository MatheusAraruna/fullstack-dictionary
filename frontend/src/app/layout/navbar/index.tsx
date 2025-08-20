import { useState } from "react"
import { LogOut } from "lucide-react"
import { signout } from "@/utils/token"
import { useNavigate } from "react-router"

export function Navbar() {
  const navigate = useNavigate()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    signout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <nav className="border-b border-neutral-400 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[60]">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-4">
          <div className="font-bold text-xl">Fullstack Dictionary</div>
        </div>

        {/* Right side - Search, Notifications, User Menu */}
        <div className="ml-auto flex items-center space-x-4">

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium border border-neutral-400">
                JD
              </div>
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-56 border border-neutral-400 rounded-md shadow-lg bg-white">
                <div className="p-3 border-b border-neutral-400">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <div className="py-1">
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-accent transition-colors cursor-pointer hover:text-red-800"
                    onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
