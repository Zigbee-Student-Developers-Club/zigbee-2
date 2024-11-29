"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import OtpInput from "./_componets/otpInput";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Page = () => {
  // states
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-red-500");

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Handle the change in the email input field
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Update email state
  };

  // Validate email on every change using useEffect
  useEffect(() => {
    if (!emailPattern.test(email)) {
      setIsEmailValid(false);
      return;
    } else {
      console.log("email valid");
      setIsEmailValid(true);

      // Check if the email is registered
      if (email === "abc@gmail.com") {
        setMessage("Email registered");
        setMessageColor("text-green-500");
      } else {
        setMessage("Email not registered");
        setMessageColor("text-red-500");
      }
    }
  }, [email]);

  const handleEmailSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Show loading spinner
    setLoading(true);

    // Simulate API call or some async process
    setTimeout(() => {
      // Hide the loading spinner after 2 seconds
      setLoading(false);
      alert("OTP sent to your email!");
    }, 2000); // Adjust time as needed
  };

  const onOtpSubmit = (otp: string) => {
    console.log("Login Successful with OTP:", otp);
    alert(`otp  : ${otp}`);
  };
  const handleOtpSubmit = () => {
    setLoading(true);

    // Simulate API call or some async process
    setTimeout(() => {
      // Hide the loading spinner after 2 seconds
      setLoading(false);
      setShowOtpInput(true); // You can add your OTP input logic here
    }, 2000);
  };
  return (
    <>
      <div className="h-auto w-full flex justify-center items-center flex-col md:h-[80dvh] ">
        <div className="h-auto min-w-[50vw] grid grid-cols-1 bg-cyan-200 dark:bg-indigo-500 rounded md:grid-cols-2 md:h-[25rem]">
          <div className="flex flex-col justify-center items-center px-6 py-4 gap-4">
            <Image
              alt="login page image"
              src="/person-with-vr.png"
              width={300}
              height={700}
              className="rounded-lg"
            />
            <Text variant="large" className="text-center">
              To keep connected with us,
              <br /> please login with your Email info.
            </Text>
          </div>

          {!showOtpInput ? (
            <div className="flex flex-col justify-center items-center py-4 gap-4 bg-cyan-50 dark:bg-indigo-300 h-full">
              <Title size="medium">Get Started</Title>

              <div className="flex flex-col items-center gap-2">
                <input
                  type="email"
                  ref={emailInputRef}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter Your Email"
                  className="bg-slate-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[16rem] p-2.5"
                  required
                />
                {message && (
                  <Text
                    variant="small"
                    className={`text-center mt-2 ${messageColor}`}
                  >
                    {message}
                  </Text>
                )}
              </div>

              <Button
                className="mt-6 flex items-center gap-2"
                type="submit"
                onClick={handleEmailSubmit}
                disabled={!isEmailValid || loading} // Disable if email is invalid or loading
              >
                GET OTP
                {loading && <LoadingSpinner />}
              </Button>
            </div>
          ) : (
            <div className="relative flex flex-col justify-center items-center px-6 py-10 gap-2 bg-cyan-50 dark:bg-indigo-300 text-back">
              <div
                className="absolute top-5 left-5 cursor-pointer"
                onClick={() => setShowOtpInput(false)}
              >
                Back
              </div>
              <Title size="medium">Check your email</Title>
              <OtpInput
                length={6}
                onOtpSubmit={onOtpSubmit}
                setDisplayArea={setShowOtpInput}
              />
              <Button
                type="button"
                className="mt-6 flex items-center gap-2"
                onClick={handleOtpSubmit}
                disabled={loading}
              >
                Verify
                {loading && <LoadingSpinner />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
