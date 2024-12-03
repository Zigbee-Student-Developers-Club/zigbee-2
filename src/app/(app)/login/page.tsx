"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import OtpInput from "./_componets/otpInput";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { checkUserExist, getOtp, verifyEmailOtp } from "@/lib/axios/allApiCall";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  // States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-gray-500"); // Default color
  const [isOtpFilled, setISOtpFilled] = useState(false);

  const router = useRouter();

  // Effect to validate email and check user existence
  useEffect(() => {
    const validateAndCheckEmail = async () => {
      if (!emailPattern.test(email)) {
        setMessage(""); // Clear message if the email is invalid
        setMessageColor("text-gray-500"); // Reset to default
        return;
      }

      try {
        const response = await checkUserExist({ email });
        if (response?.isRegistered) {
          setMessage("Email is registered.");
          setMessageColor("text-green-500"); // Green for registered email
        } else {
          setMessage("Email is not registered.");
          setMessageColor("text-red-500"); // Red for unregistered email
        }
      } catch (error) {
        console.error("Error checking email existence:", error);
        setMessage("Error verifying email.");
        setMessageColor("text-red-500");
      }
    };

    validateAndCheckEmail();
  }, [email]);

  // Handlers
  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await getOtp({ email });
      if (response) {
        setShowOtpInput(true);
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Please try again. ");
      console.log(error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await verifyEmailOtp({ email, otp });
      if (response) {
        const { isProvidedBasicData } = response;
        setMessage("");
        if (isProvidedBasicData) {
          router.push("/profile");
        } else {
          router.push("/update-profile");
        }
      } else {
        setMessage("Failed to verify OTP. Try again.");
        setMessageColor("text-red-500");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Invalid OTP or server error. Please try again.");
      setMessageColor("text-red-500");
    } finally {
      setLoading(false);
    }
  };

  const resetOtpState = () => {
    setOtp("");
    setISOtpFilled(false);
    setShowOtpInput(false);
    setLoading(false);
  };

  return (
    <div className="h-auto w-full flex justify-center items-center flex-col md:h-[80dvh]">
      <div className="h-auto min-w-[50vw] grid grid-cols-1 bg-cyan-200 dark:bg-indigo-500 rounded-xl md:grid-cols-2 md:h-[25rem] ">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center px-6 py-4 gap-4">
          <Image
            alt="login page image"
            src="/person-with-vr.png"
            width={300}
            height={700}
            className="rounded-lg"
          />
          <Text variant="large" className="text-center">
            To keep connected with us, <br /> please login with your Email info.
          </Text>
        </div>

        {/* Right Section */}
        {showOtpInput ? (
          <OtpInputSection
            setOtp={setOtp}
            isOtpFilled={isOtpFilled}
            setISOtpFilled={setISOtpFilled}
            loading={loading}
            handleOtpSubmit={handleOtpSubmit}
            resetOtpState={resetOtpState}
            message={message}
            messageColor={messageColor}
          />
        ) : (
          <EmailInputSection
            email={email}
            setEmail={setEmail}
            message={message}
            messageColor={messageColor}
            loading={loading}
            handleEmailSubmit={handleEmailSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

const EmailInputSection = ({
  email,
  setEmail,
  message,
  messageColor,
  loading,
  handleEmailSubmit,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  messageColor: string;
  loading: boolean;
  handleEmailSubmit: () => void;
}) => (
  <div className="flex flex-col justify-center items-center py-4 gap-4 bg-cyan-50 dark:bg-indigo-300 h-full">
    <Title size="medium">Get Started</Title>
    <div className="flex flex-col items-center gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        className="bg-slate-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[16rem] p-2.5"
        required
      />
      <Text
        variant="small"
        className={`text-center mt-2 ${messageColor} h-1.5`}
      >
        {message || " "}
      </Text>
    </div>
    <Button
      className="mt-6 flex items-center gap-2"
      onClick={handleEmailSubmit}
      disabled={!emailPattern.test(email) || loading}
    >
      GET OTP
      {loading && <LoadingSpinner />}
    </Button>
  </div>
);

const OtpInputSection = ({
  setOtp,
  isOtpFilled,
  setISOtpFilled,
  loading,
  handleOtpSubmit,
  resetOtpState,
  message,
  messageColor,
}: {
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  isOtpFilled: boolean;
  setISOtpFilled: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleOtpSubmit: () => void;
  resetOtpState: () => void;
  message: string;
  messageColor: string;
}) => (
  <div className="relative flex flex-col justify-center items-center px-6 py-10 gap-2 bg-cyan-50 dark:bg-indigo-300 text-back">
    <div
      className="absolute top-5 left-5 cursor-pointer"
      onClick={resetOtpState}
    >
      Back
    </div>
    <Title size="medium">Check your email</Title>
    <OtpInput
      length={6}
      onOtpFilled={(value: string) => {
        setOtp(value);
        setISOtpFilled(value.length === 6);
      }}
    />
    <Text variant="small" className={`text-center mt-2 ${messageColor} h-1.5`}>
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
