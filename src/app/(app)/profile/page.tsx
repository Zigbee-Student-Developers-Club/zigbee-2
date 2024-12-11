"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Title from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UploadImageDialog from "@/components/common/UploadImageDialog";
import { ImageUp } from "lucide-react";
import { UserData } from "@/lib/types";

// Mock API Calls
const fetchUserData = async (): Promise<UserData> => {
  return {
    batch: 2022,
    phoneNumber: "1234567890",
    name: "John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe/",
    position: "Software Engineer",
    profileImg: "https://github.com/shadcn.png",
    domain: "Frontend Development",
    about: "Passionate developer specializing in React and TypeScript.",
  };
};

const saveUserData = async (data: UserData) => {
  console.log("Saving user data:", data);
  // Replace this with an actual API call
  return true;
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveImage = (file: File | null) => {
    if (file) {
      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          profileImg: URL.createObjectURL(file), // Generate a preview URL for the image
        };
      });
    }
    setIsDialogOpen(false);
  };

  const handleToggle = async () => {
    if (editMode) {
      const confirmSave = window.confirm(
        "Save changes before exiting edit mode?"
      );
      if (confirmSave) {
        setLoading(true);
        await saveUserData(user!);
        setLoading(false);
      }
    }
    setEditMode(!editMode);
  };

  React.useEffect(() => {
    // Fetch user data when the component mounts
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUser(data);
    };
    loadUserData();
  }, []);

  const handleInputChange = (
    field: keyof UserData,
    value: string | number | null
  ) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-16 max-w-[1200px] px-4 sm:px-6">
      {/* Profile Banner */}
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
        <div className="h-full w-full bg-lime-400 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/30">
          <div className="group relative">
            <Avatar className="h-52 w-52">
              <AvatarImage
                src={user.profileImg || "https://github.com/shadcn.png"}
                alt="User Avatar"
                className="rounded-full border-8 border-white dark:border-black"
              />
              <AvatarFallback className="flex h-64 w-64 items-center justify-center rounded-full border-8 border-white bg-gray-100 text-2xl text-gray-700">
                {user.name ? user.name[0] : "P"}
              </AvatarFallback>
            </Avatar>
            {editMode && (
              <div
                className="absolute -bottom-5 right-1/2 z-50 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-white dark:bg-black"
                onClick={() => setIsDialogOpen(true)}
              >
                <ImageUp className="text-black dark:text-white"/>
              </div>
            )}
          </div>
          <Title size="medium" className="text-black">{user.name}</Title>
        </div>
        <div className="absolute inset-2 flex items-end justify-end space-x-2">
          <Text
            variant="large"
            className="text-sm text-black"
          >
            Edit Mode
          </Text>
          <Switch
            checked={editMode}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="mt-6 flex items-center justify-between">
        <Title
          size="medium"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Profile Details
        </Title>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <Text variant="small" className="text-gray-700 dark:text-gray-400">
              {user.name}
            </Text>
          )}
        </div>
        <div>
          <Text variant="large" className="text-gray-700 dark:text-gray-300">
            Position
          </Text>
          {editMode ? (
            <Input
              value={user.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Position"
            />
          ) : (
            <Text variant="small" className="text-gray-700 dark:text-gray-400">
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
              type="number"
              value={user.batch}
              onChange={(e) =>
                handleInputChange("batch", Number(e.target.value))
              }
            />
          ) : (
            <Text variant="small" className="text-gray-700 dark:text-gray-400">
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
              type="number"
              value={user.phoneNumber || ""}
              onChange={(e) =>
                handleInputChange("phoneNumber", e.target.value || null)
              }
              placeholder="Phone Number"
            />
          ) : (
            <Text variant="small" className="text-gray-700 dark:text-gray-400">
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
              onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
              placeholder="LinkedIn URL"
            />
          ) : (
            <Text variant="small">
              <a
                href={user.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                {user.linkedInUrl}
              </a>
            </Text>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8">
        <Text variant="large" className="text-gray-700 dark:text-gray-300">
          About
        </Text>
        {editMode ? (
          <Textarea
            rows={5}
            value={user.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            placeholder="Write about yourself..."
          />
        ) : (
          <Text className="text-gray-700 dark:text-gray-400">{user.about}</Text>
        )}
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="mt-6 flex justify-end">
          <Button
            // onClick={handleSaveChanges}
            disabled={loading}
          >
            Save Changes
          </Button>
        </div>
      )}

      {/* Upload Image Dialog */}
      <UploadImageDialog
        isOpen={isDialogOpen}
        currentImage={user.profileImg}
        onSave={handleSaveImage}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
