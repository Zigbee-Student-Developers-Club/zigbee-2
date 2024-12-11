"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadImageDialog from "@/components/common/UploadImageDialog";
import { ImageUp } from "lucide-react";
import { UserData } from "@/lib/types";
import InfoSection from "@/components/common/InfoSection";

// Mock API Call to save user data
const saveUserData = async (data: UserData) => {
  console.log("Saving user data:", data);
  // Replace with actual API call to save data
  return true;
};

const UploadProfilePage = () => {
  const [user, setUser] = useState<UserData>({
    name: "",
    position: "",
    batch: 2025,
    phoneNumber: "",
    linkedInUrl: "",
    profileImg: "",
    domain: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileUpload = (file: File) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        profileImg: URL.createObjectURL(file),
      };
    });
  };

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
    await saveUserData(user); // Save user data
    setLoading(false);
    alert("Profile saved successfully!");
  };

  return (
    <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">

      {/* {InfoCointainer} */}
      <InfoSection
        imageSrc="/about-us.png"
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
                src={user.profileImg}
                alt="User Avatar"
                className="rounded-full border-8 border-white dark:border-black"
              />
              <AvatarFallback className="flex h-64 w-64 items-center justify-center rounded-full border-8 border-white bg-gray-100 text-2xl text-gray-700">
                {user.name ? user.name[0] : "?"}
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
            {user.name || "Your Name"}
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
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Full Name
            </Text>
            <Input
              value={user.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Position
            </Text>
            <Input
              value={user.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Position"
            />
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Batch
            </Text>
            <Input
              type="number"
              value={user.batch}
              onChange={(e) =>
                handleInputChange("batch", Number(e.target.value))
              }
              placeholder="2025"
            />
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Phone Number
            </Text>
            <Input
              type="number"
              value={user.phoneNumber}
              onChange={(e) =>
                handleInputChange("phoneNumber", e.target.value || null)
              }
              placeholder="Phone Number"
            />
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              LinkedIn Profile
            </Text>
            <Input
              type="url"
              value={user.linkedInUrl}
              onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <Text variant="large" className="text-gray-700 dark:text-gray-300">
            About
          </Text>
          <Textarea
            rows={5}
            value={user.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            placeholder="Write about yourself..."
          />
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
        currentImage={user.profileImg}
        onSave={handleFileUpload}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default UploadProfilePage;
