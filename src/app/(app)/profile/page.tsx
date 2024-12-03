"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import Title from "@/components/ui/title";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userData } from "@/lib/types";

// Mock API Calls
const fetchUserData = async (): Promise<userData> => {
  return {
    batch: 2022,
    phoneNumber: 1234567890,
    name: "John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe/",
    position: "Software Engineer",
    profileImg: "https://github.com/shadcn.png",
    domain: "Frontend Development",
    about: "Passionate developer specializing in React and TypeScript.",
  };
};

const saveUserData = async (data: userData) => {
  console.log("Saving user data:", data);
  // Replace this with an actual API call
  return true;
};

const ProfilePage = () => {
  const [user, setUser] = useState<userData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // Fetch user data when the component mounts
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUser(data);
    };
    loadUserData();
  }, []);

  const handleToggle = async () => {
    if (editMode) {
      // Save data when switching off edit mode
      setLoading(true);
      await saveUserData(user!);
      setLoading(false);
    }
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    console.log("anny 11  ");
  };

  const handleInputChange = (
    field: keyof userData,
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
          <Avatar className="h-52 w-52">
            <AvatarImage
              src={user.profileImg || "https://github.com/shadcn.png"}
              alt="User Avatar"
              height={400}
              width={400}
              className="rounded-full border-8 border-white"
            />
            <AvatarFallback className="flex h-64 w-64 items-center justify-center rounded-full border-8 border-white bg-gray-100 text-2xl text-gray-700">
              {user.name ? user.name[0] : "P"}
            </AvatarFallback>
          </Avatar>
          <Title size="medium">{user.name}</Title>
        </div>
        <div className="absolute inset-2 flex items-end justify-end space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Edit Mode
          </span>
          <Switch
            checked={editMode}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
        </div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Details
        </h1>
      </div>

      {/* Profile Information */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          {editMode ? (
            <Input
              value={user.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name"
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-400">{user.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Position
          </label>
          {editMode ? (
            <Input
              value={user.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Position"
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-400">{user.position}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Batch
          </label>
          {editMode ? (
            <Input
              type="number"
              value={user.batch}
              onChange={(e) =>
                handleInputChange("batch", Number(e.target.value))
              }
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-400">{user.batch}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
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
            <p className="text-gray-700 dark:text-gray-400">
              {user.phoneNumber || "N/A"}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn Profile
          </label>
          {editMode ? (
            <Input
              type="url"
              value={user.linkedInUrl}
              onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
              placeholder="LinkedIn URL"
            />
          ) : (
            <a
              href={user.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline dark:text-blue-400"
            >
              {user.linkedInUrl}
            </a>
          )}
        </div>
        <div>
          {editMode && (
            <>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Change Profile Image
              </label>
              <Input
                type="text"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          About
        </label>
        {editMode ? (
          <Textarea
            value={user.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            placeholder="Write about yourself..."
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-400">{user.about}</p>
        )}
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveChanges} disabled={loading}>
            Save Changes
          </Button>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-gray-500"></div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
