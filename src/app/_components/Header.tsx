"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navItemsData = [
  { name: "Department", route: "/department" },
  { name: "Alumni", route: "/alumni" },
  { name: "Events", route: "/events" },
  { name: "Resources", route: "/resources" },
  { name: "Magazines", route: "/magazines" },
];

const Header = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    // Mock authentication token
    setToken("hgygygg");
  }, []);

  const handleNavigation = (navigate: string) => {
    switch (navigate) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        localStorage.removeItem("auth-token");
        setToken(null);
        router.push("/login");
        break;
      case "login":
        router.push("/login");
        break;
      default:
        console.error("Unknown navigation option");
    }
    // Close dropdowns when navigating
    setThemeMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="w-full flex justify-between items-center max-w-[1200px] mx-auto py-4 px-4 md:py-8">
      <Logo />

      <div className="flex items-center gap-3 flex-row-reverse md:flex-row">
        {/* Hamburger Menu for mobile */}
        <button
          className="block md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md md:static md:flex md:w-auto md:bg-transparent md:shadow-none z-10`}
        >
          <ul className="flex flex-col md:flex-row items-center md:gap-8 p-4 md:p-0">
            {navItemsData.map((item, index) => (
              <li key={index} className="mb-2 md:mb-0">
                <Link
                  href={item.route}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme and Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu open={themeMenuOpen} onOpenChange={setThemeMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu
            open={profileMenuOpen}
            onOpenChange={setProfileMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={token ? "https://github.com/shadcn.png" : ""}
                  alt="User Avatar"
                />
                <AvatarFallback>{token ? "U" : "?"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {token ? (
                <>
                  <DropdownMenuItem onClick={() => handleNavigation("profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation("logout")}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => handleNavigation("login")}>
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
