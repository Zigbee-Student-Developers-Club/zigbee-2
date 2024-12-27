import React, { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ChevronLeft } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface OtpInputSectionProps {
  email: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  isOtpFilled: boolean;
  setISOtpFilled: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleOtpSubmit: () => void;
  resetOtpState: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageColor: string;
}

const OtpInputSection: React.FC<OtpInputSectionProps> = ({
  email,
  setOtp,
  isOtpFilled,
  setISOtpFilled,
  loading,
  handleOtpSubmit,
  resetOtpState,
  message,
  setMessage,
  messageColor,
}) => {
  const [otp, localSetOtp] = useState<string>("");

  // Update parent OTP state and check if it's fully filled
  useEffect(() => {
    setOtp(otp);
    setISOtpFilled(otp.length === 6); 
  }, [otp, setOtp, setISOtpFilled]);

  // Clear error message when OTP changes
  useEffect(() => {
    if (message) {
      setMessage(""); 
    }
  }, [otp, setMessage,message]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-2 bg-cyan-50 px-6 py-10 dark:bg-indigo-300">
      <div
        className="absolute left-5 top-5 cursor-pointer"
        onClick={resetOtpState}
      >
        <ChevronLeft />
      </div>
      <Title size="medium">Check your email</Title>
      <Text variant="small" className={`my-2 text-center text-gray-600 leading-normal`}>
        Please enter the one-time password sent to your Email <br /> {email}
      </Text>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        autoFocus
        value={otp}
        onChange={(newValue) => localSetOtp(newValue)}
      >
        <InputOTPGroup className="gap-2">
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="h-10 w-10 rounded border-2 border-blue-400 text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Text
        variant="small"
        className={`mt-2 text-center ${messageColor} h-1.5`}
      >
        {message || " "}
      </Text>
      <Button
        type="button"
        className="mt-6 flex items-center gap-2"
        onClick={handleOtpSubmit}
        disabled={!isOtpFilled || loading}
      >
        Verify
        {loading && <LoadingSpinner />}
      </Button>
    </div>
  );
};

export default OtpInputSection;
