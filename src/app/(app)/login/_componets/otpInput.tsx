"use client";

import React, { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  length: number;
  onOtpSubmit: (otp: string) => void;
  setDisplayArea: (visible: boolean) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; 

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);

    // Trigger submission when all fields are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // Move to the next input if not the last input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">

      <div className="flex gap-1">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-10 w-10 text-center text-xl border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        type="submit"
        className={`rounded w-[50%] bg-blue-500 text-white  p-2 mt-6 mb-12 ${
          otp.includes("") ? "cursor-not-allowed bg-gray-600" : "cursor-pointer"
        }`}
        disabled={otp.includes("")}
        onClick={() => onOtpSubmit(otp.join(""))}
      >
        Verify
      </button>
    </div>
  );
};

export default OtpInput;
