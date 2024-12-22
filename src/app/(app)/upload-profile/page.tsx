"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import UploadImageDialog from "@/components/common/UploadImageDialog";
import { ImageUp, ChevronDown } from "lucide-react";
import { UserData, validPositions } from "@/lib/types";
import InfoSection from "@/components/common/InfoSection";
import { uploadUserData } from "@/lib/axios/allApiCall";
import MotionDivProvider from "@/components/provider/MotionDivProvider";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const UploadProfilePage = () => {
  const [user, setUser] = useState<Partial<UserData>>({
    name: "",
    profileImg: "",
    phoneNumber: "",
    batch: "",
    linkedInUrl: "",
    domain: "",
    about: "",
    position: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleFileUpload = (profileImgUrl: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImg: profileImgUrl,
    }));
  };

  useEffect(() => {
    return () => {
      if (user?.profileImg) {
        URL.revokeObjectURL(user?.profileImg);
      }
    };
  }, [user?.profileImg]);

  const handleInputChange = (
    field: keyof UserData,
    value: string | number | null
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const res = await uploadUserData(user);
      if (res) {
        // Update the session with new data
        await update({
          ...session,
          user: {
            ...session?.user,
            isProvidedBasicData: true,
          },
        });
        alert("Profile saved successfully!");
        router.push("/");
      }
    } catch (error) {
      alert(
        `${(error as Error)?.message || "Failed to save profile. Please try again"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionDivProvider>
      <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
        {/* Info Section */}
        <InfoSection
          imageSrc="/about-us.webp"
          heading="We’d Love to Know You Better!"
          text="Your story matters to us! Share your basic details so we can connect, recognize, and reach out to you effortlessly. By staying connected, you'll be the first to know about all the exciting events and opportunities we have in store just for you!"
          background="bg-emerald-100"
          darkBackground="dark:bg-emerald-900"
          placedImage={true}
        />

        {/* Profile Banner */}
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
          <div className="h-full w-full bg-lime-400 object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/30">
            <div className="group relative">
              <Avatar className="h-52 w-52">
                <AvatarImage
                  src={user?.profileImg || ""}
                  alt="User Avatar"
                  className="rounded-full border-8 border-white dark:border-black"
                />
                <AvatarFallback className="flex h-64 w-64 items-center justify-center rounded-full border-8 border-white bg-gray-100 text-2xl text-gray-700">
                  {user?.name ? user.name[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute -bottom-5 right-1/2 z-50 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-white dark:bg-black"
                onClick={() => setIsDialogOpen(true)}
              >
                <ImageUp className="text-black dark:text-white" />
              </div>
            </div>
            <Title size="medium" className="text-black">
              {user?.name || "Your Name"}
            </Title>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-6">
          <Title
            size="medium"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Profile Details
          </Title>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Full Name*
              </Text>
              <Input
                value={user?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Batch
              </Text>
              <Input
                type="text"
                value={user?.batch || ""}
                onChange={(e) =>
                  handleInputChange("batch", Number(e.target.value))
                }
                placeholder="2025"
              />
            </div>
            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Position
              </Text>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-between"
                  >
                    {user?.position || "Select Position"}{" "}
                    {/* Fallback for position */}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {validPositions.map((position) => (
                    <DropdownMenuItem
                      key={position}
                      onSelect={() => handleInputChange("position", position)}
                    >
                      {position}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Phone Number*
              </Text>
              <Input
                type="text"
                value={user?.phoneNumber || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numeric input
                  if (/^\d*$/.test(value)) {
                    handleInputChange("phoneNumber", value);
                  }
                }}
                placeholder="Phone Number"
              />
            </div>

            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                LinkedIn Profile
              </Text>
              <Input
                type="url"
                value={user?.linkedInUrl || ""}
                onChange={(e) =>
                  handleInputChange("linkedInUrl", e.target.value)
                }
                placeholder="LinkedIn URL"
              />
            </div>

            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Domain
              </Text>
              <Input
                type="text"
                value={user?.domain || ""}
                onChange={(e) => handleInputChange("domain", e.target.value)}
                placeholder="Frontend-developer | Android"
              />
            </div>

            {/* About Section */}
            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                About Yourself
              </Text>

              <Textarea
                rows={3}
                value={user?.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                placeholder="Write about yourself..."
              />
            </div>

            <div>
              <Text
                variant="large"
                className="text-gray-700 dark:text-gray-300"
              >
                Feedback
              </Text>
              <Textarea
                rows={3}
                value={user?.feedback}
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                placeholder="Write something about our department & Zigbee..."
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveChanges} disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>

        {/* Upload Image Dialog */}
        <UploadImageDialog
          isOpen={isDialogOpen}
          currentImage={user?.profileImg || ""}
          onSave={handleFileUpload}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </MotionDivProvider>
  );
};

export default UploadProfilePage;
