import { cn } from "@/lib/utils";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

export default function Title({
  children,
  size = "medium",
  className = "",
}: TitleProps) {
  let sizeClasses = "";
  let HeadingTag: "h1" | "h2" | "h3";

  switch (size) {
    case "small":
      sizeClasses = "text-lg md:text-xl font-semibold";
      HeadingTag = "h3";
      break;
    case "large":
      sizeClasses = "text-3xl md:text-5xl font-bold";
      HeadingTag = "h1";
      break;
    case "medium":
    default:
      sizeClasses = "text-2xl md:text-3xl font-bold";
      HeadingTag = "h2";
      break;
  }

  return (
    <HeadingTag className={cn(`${sizeClasses} my-4 text-primary`, className)}>
      {children}
    </HeadingTag>
  );
}
