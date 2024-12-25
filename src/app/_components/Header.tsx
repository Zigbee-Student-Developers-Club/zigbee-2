"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";

const navItemsData = [
  { name: "Code Wars", route: "/codewars" },
  { name: "Our Team", route: "/team" },
  { name: "Alumni", route: "/alumni" },
  { name: "Events", route: "/events" },
  { name: "Resources", route: "/resources" },
  { name: "Magazines", route: "/magazines" },
];
const Header = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleNavigation = (navigate: string) => {
    switch (navigate) {
      case "profile":
        router.push("/profile");
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
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 md:py-8">
      <Logo />

      <div className="flex flex-row-reverse items-center gap-3 md:flex-row">
        {/* Hamburger Menu for mobile */}
        <button
          className="block text-gray-700 dark:text-gray-300 md:hidden"
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
          } shadow-m absolute left-0 top-16 z-10 w-full min-w-80 bg-white md:static md:flex md:w-auto md:bg-transparent md:shadow-none`}
        >
          <ul className="flex flex-col items-center gap-3 p-4 md:flex-row md:p-0 lg:gap-8">
            {navItemsData.map((item, index) => (
              <li key={index} className="mb-2 md:mb-0">
                <Link
                  href={item.route}
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
          {status === "loading" ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
          ) : (
            <DropdownMenu
              open={profileMenuOpen}
              onOpenChange={setProfileMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-auto cursor-pointer overflow-hidden rounded-full">
                  <AvatarImage
                    src={
                      status == "authenticated"
                        ? session?.user?.image ||
                          "https://github.com/shadcn.png"
                        : ""
                    }
                    alt="User Avatar"
                    className="h-full w-full object-cover object-center"
                  />
                  <AvatarFallback className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-xl text-gray-700">
                    {status === "authenticated"
                      ? session?.user?.name?.charAt(0).toUpperCase() || "U"
                      : "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {status === "authenticated" ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleNavigation("profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOut();
                      }}
                    >
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
