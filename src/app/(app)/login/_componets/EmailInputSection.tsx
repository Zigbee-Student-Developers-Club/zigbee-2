"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface EmailInputSectionProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  messageColor: string;
  loading: boolean;
  handleEmailSubmit: () => void;
}

const EmailInputSection: React.FC<EmailInputSectionProps> = ({
  email,
  setEmail,
  message,
  messageColor,
  loading,
  handleEmailSubmit,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-cyan-50 py-4 dark:bg-indigo-300">
      <Title size="medium">Get Started</Title>
      <div className="flex flex-col items-center gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="block w-[16rem] rounded-lg border border-black bg-slate-50 p-2.5 text-sm text-black focus:border-blue-500 focus:ring-blue-500"
          required
        />
        <Text
          variant="small"
          className={`mt-2 text-center ${messageColor} h-1.5`}
        >
          {message || " "}
        </Text>
      </div>
      <Button
        className="mt-6 flex items-center gap-2"
        onClick={handleEmailSubmit}
        disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || loading}
      >
        GET OTP
        {loading && <LoadingSpinner />}
      </Button>
    </div>
  );
};

export default EmailInputSection;
