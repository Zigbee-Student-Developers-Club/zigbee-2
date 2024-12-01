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
import { Moon, Sun } from "lucide-react";
import Logo from "./Logo";

const navItemsData = [
  {
    name: "Department",
    route: "/department",
  },
  {
    name: "Alumni",
    route: "/alumni",
  },
  {
    name: "Events",
    route: "/events",
  },
  {
    name: "Resources",
    route: "/resources",
  },
  {
    name: "Magazines",
    route: "/magazines",
  },
];

const Header = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // setToken(localStorage.getItem("auth-token"));
    setToken("andggdsvsh");
  }, []);

  const handleNavigation = (navigate: string) => {
    switch (navigate) {
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        localStorage.removeItem("auth-token");
        setToken(null); // Clear the token from state
        router.push("/login");
        break;
      case "login":
        router.push("/login");
        break;
      default:
        console.error("Unknown navigation option");
    }
  };

  return (
    <div className="w-full flex justify-between items-center gap-4 max-w-[1200px] mx-auto py-8">
      <Logo />

      <nav>
        <ul className="flex items-center gap-8">
          {navItemsData.map((item, index) => (
            <Link href={item.route} key={index}>
              {item.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="User menu">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                  />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              </Button>
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
        </ul>
      </nav>
    </div>
  );
};

export default Header;
