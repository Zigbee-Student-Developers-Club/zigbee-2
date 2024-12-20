"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { checkUserExist, getOtp, verifyEmailOtp } from "@/lib/axios/allApiCall";
import { useRouter } from "next/navigation";
import OtpInputSection from "@/app/(app)/login/_componets/OtpInputSection";
import EmailInputSection from "@/app/(app)/login/_componets/EmailInputSection";

const LoginPage = () => {
  // States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-gray-500");
  const [isOtpFilled, setISOtpFilled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const validateAndCheckEmail = async () => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage("");
        setMessageColor("text-gray-500");
        return;
      }

      try {
        const response = await checkUserExist({ email });
        if (response?.isRegistered) {
          setMessage("Email is registered.");
          setMessageColor("text-green-500");
        } else {
          setMessage("Email is not registered.");
          setMessageColor("text-red-500");
        }
      } catch (error) {
        setMessage((error as Error)?.message || "Error verifying email.");
        setMessageColor("text-red-500");
        //console.log(error);
      }
    };

    validateAndCheckEmail();
  }, [email]);

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
      setMessage(
        (error as Error)?.message || "Error sending OTP. Please try again."
      );
      //console.log(error);
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
        const { isProvidedBasicData, error } = response;

        if (error) {
          throw new Error(error);
        }

        if (isProvidedBasicData) {
          router.push("/");
        } else {
          router.push("/upload-profile");
        }
      } else {
        setMessage("Failed to verify OTP. Try again.");
        setMessageColor("text-red-500");
      }
    } catch (error) {
      setMessage((error as Error)?.message || "Invalid OTP or server error.");
      setMessageColor("text-red-500");
      //console.log(error);
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
    <div className="flex h-auto w-full flex-col items-center justify-center md:h-[80dvh]">
      <div className="grid h-auto min-w-[50vw] grid-cols-1 rounded-xl bg-cyan-200 dark:bg-indigo-500 md:h-[25rem] md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-4">
          <Image
            alt="login page image"
            src="/person-with-vr.webp"
            width={300}
            height={700}
            className="rounded-lg"
          />
          <Text variant="large" className="text-center">
            To keep connected with us, <br /> please login with your Email info.
          </Text>
        </div>

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
