"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-5 text-center text-gray-800 sm:p-10 md:p-16">
      <AlertCircle className="mb-8 h-20 w-20 text-red-500" />
      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mb-8 text-xl text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button
        variant={"outline"}
        onClick={() => router.push("/")}
        className="flex items-center space-x-2 rounded-md"
      >
        <Home className="h-4 w-4" />
        <span>Go to Homepage</span>
      </Button>
    </div>
  );
}
