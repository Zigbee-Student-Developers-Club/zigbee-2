"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpInputProps {
  length: number;
  onOtpFilled: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onOtpFilled }) => {
  const [otp, setOtp] = useState<string>("");

  // This effect runs every time the otp changes
  useEffect(() => {
    // If the OTP value is complete, submit the OTP
    if (otp.length === length) {
      console.log("OTP is complete:", otp); 
      onOtpFilled(otp); // Trigger the submit action
    }
  }, [otp, length, onOtpFilled]); 

  return (
    <>
      <InputOTP
        maxLength={length}
        value={otp}
        onChange={(newValue) => setOtp(newValue)} // Update value as the user types
      >
        <InputOTPGroup className="gap-2">
          <InputOTPSlot
            index={0}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputOTPSlot
            index={1}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputOTPSlot
            index={2}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputOTPSlot
            index={3}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputOTPSlot
            index={4}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputOTPSlot
            index={5}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </InputOTPGroup>
      </InputOTP>
    </>
  );
};

export default OtpInput;
