"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import UploadImageDialog from "@/components/common/UploadImageDialog";
import { ImageUp, ChevronDown } from "lucide-react";
import { UserData, validPositions } from "@/lib/types";
import MotionDivProvider from "@/components/provider/MotionDivProvider";

import { useFetchUserProfile } from "@/lib/SWRhooks/useSWR";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { updateUserData } from "@/lib/axios/allApiCall";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { userProfile, isLoading, isValidating, error } = useFetchUserProfile();

  const [user, setUser] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session, update } = useSession();

  const handleFileUpload = (profileImgUrl: string) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        profileImg: profileImgUrl,
      };
    });
  };

  const handleToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    field: keyof UserData,
    value: string | number | null
  ) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await updateUserData(user);
      if (response) {
        // Update the session with new data
        await update({
          ...session,
          user: {
            ...session?.user,
            name: user?.name,
            image: user?.profileImg,
          },
        });
        toast({ description: "Your profile updated successfully." });
        setEditMode(false);
      } else {
        alert("Some error occurred ");
      }
    } catch (error) {
      alert((error as Error).message || "Failed to save the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);

  useEffect(() => {
    return () => {
      if (user?.profileImg) {
        URL.revokeObjectURL(user.profileImg);
      }
    };
  }, [user?.profileImg]);

  if (isLoading || isValidating) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    // console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile</div>;
  }

  if (!user) {
    return <div>No user profile found</div>;
  }

  return (
    <MotionDivProvider>
      <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
        {/* Profile Banner */}
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
          <div className="h-full w-full bg-lime-400 object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/30">
            <div className="group relative">
              <Avatar className="h-52 w-52 cursor-pointer overflow-hidden rounded-full">
                <AvatarImage
                  src={user?.profileImg || ""}
                  alt="User Avatar"
                  className="h-full w-full object-cover object-center"
                />
                <AvatarFallback className="flex h-52 w-52 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-xl text-gray-700">
                  {user?.name ? user.name[0].toUpperCase() : "P"}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <div
                  className="absolute -bottom-5 right-1/2 z-50 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-white dark:bg-black"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <ImageUp className="text-black dark:text-white" />
                </div>
              )}
            </div>
            <Title size="medium" className="text-black">
              {user.name}
            </Title>

            <Text variant="small" className="text-gray-900 dark:text-white">
              {user.role}
            </Text>
          </div>
          <div className="absolute inset-2 flex items-end justify-end space-x-2">
            <Text variant="large" className="text-sm text-black">
              Edit Mode
            </Text>
            <Switch
              checked={editMode}
              onCheckedChange={handleToggle}
              disabled={loading}
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 flex items-center justify-between">
          <Title
            size="medium"
            className="font-bold text-gray-900 dark:text-white"
          >
            Profile Details
          </Title>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Full Name
            </Text>
            {editMode ? (
              <Input
                value={user.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Full Name"
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.name}
              </Text>
            )}
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Position
            </Text>
            {editMode ? (
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
                  {validPositions.map((position: string) => (
                    <DropdownMenuItem
                      key={position}
                      onSelect={() => handleInputChange("position", position)}
                    >
                      {position === "" ? "No role" : position}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.position}
              </Text>
            )}
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Batch
            </Text>
            {editMode ? (
              <Input
                type="text"
                value={user.batch}
                onChange={(e) => handleInputChange("batch", e.target.value)}
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.batch}
              </Text>
            )}
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Phone Number
            </Text>
            {editMode ? (
              <Input
                type="text"
                value={user.phoneNumber || ""}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value || null)
                }
                placeholder="Phone Number"
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.phoneNumber || "N/A"}
              </Text>
            )}
          </div>
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              LinkedIn Profile
            </Text>
            {editMode ? (
              <Input
                type="url"
                value={user.linkedInUrl}
                onChange={(e) =>
                  handleInputChange("linkedInUrl", e.target.value)
                }
                placeholder="LinkedIn URL"
              />
            ) : (
              <Text variant="small">
                <a
                  href={user.linkedInUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  {user.linkedInUrl}
                </a>
              </Text>
            )}
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Domain
            </Text>
            {editMode ? (
              <Input
                type="url"
                value={user.domain}
                onChange={(e) => handleInputChange("domain", e.target.value)}
                placeholder="Android Developer"
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.domain || "N/A"}
              </Text>
            )}
          </div>

          {/* About Section */}
          <div className="mt-8">
            <Text
              variant="large"
              className="m-0 p-0 text-gray-700 dark:text-gray-300"
            >
              About Yourself
            </Text>
            {editMode ? (
              <Textarea
                rows={5}
                value={user.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                placeholder="Write about yourself..."
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.about}
              </Text>
            )}
          </div>

          <div className="mt-8">
            <Text
              variant="large"
              className="m-0 text-gray-700 dark:text-gray-300"
            >
              Feedback
            </Text>
            {editMode ? (
              <Textarea
                rows={5}
                value={user.feedback}
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                placeholder="Write something about our department & Zigbee..."
              />
            ) : (
              <Text
                variant="small"
                className="text-gray-700 dark:text-gray-400"
              >
                {user.feedback}
              </Text>
            )}
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveChanges} disabled={loading}>
              Save Changes
            </Button>
          </div>
        )}

        {/* Upload Image Dialog */}
        <UploadImageDialog
          isOpen={isDialogOpen}
          currentImage={user.profileImg}
          onSave={handleFileUpload}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </MotionDivProvider>
  );
};

export default ProfilePage;
