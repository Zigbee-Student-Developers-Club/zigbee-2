"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import Title from "@/components/ui/title";
import { Textarea } from "@/components/ui/textarea";
import { UserData } from "@/lib/types";

interface UserUpdateDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: UserData) => void;
  user: UserData; // UserData data to prepopulate the form
}

const UserUpdateDialogBox: React.FC<UserUpdateDialogBoxProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    email: "",
    phoneNumber: "",
    linkedInUrl: "",
    about: "",
    feedback: "",
    position: "Select Position",
    role: "Select Role",
    isAdmin: false,
    isContributor: false,
  });

  // Sync formData with user prop
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        batch: user.batch || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        linkedInUrl: user.linkedInUrl || "",
        about: user.about || "",
        feedback: user.feedback || "",
        position: user.position || "Select Position",
        role: user.role || "Select Role",
        isAdmin: user.isAdmin || false,
        isContributor: user.isContributor || false,
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-[50dvw] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            <Title size="medium">Update UserData Data</Title>
          </DialogTitle>
        </DialogHeader>
        <Title size="medium" className="m-0 mt-6">
          Personal Information
        </Title>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Full Name
            </Text>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name"
              disabled
            />
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Batch
            </Text>
            <Input
              type="text"
              value={formData.batch}
              onChange={(e) => handleInputChange("batch", e.target.value)}
              placeholder="Batch"
              disabled
            />
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Email
            </Text>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
              disabled
            />
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Phone Number
            </Text>
            <Input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  handleInputChange("phoneNumber", value);
                }
              }}
              placeholder="Phone Number"
              disabled
            />
          </div>

          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              LinkedIn Profile
            </Text>
            <Input
              type="url"
              value={formData.linkedInUrl}
              onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
              placeholder="LinkedIn URL"
              disabled
            />
          </div>
        </div>
        <div>
          <Text variant="large" className="text-gray-700 dark:text-gray-300">
            About
          </Text>

          <Textarea
            rows={3}
            value={formData.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            placeholder="Write about yourself..."
          />
        </div>

        <div>
          <Text variant="large" className="text-gray-700 dark:text-gray-300">
            Feedback
          </Text>
          <Textarea
            rows={3}
            value={formData.feedback}
            onChange={(e) => handleInputChange("feedback", e.target.value)}
            placeholder="Write about yourself..."
          />
        </div>

        <Title size="small" className="m-0 mt-6">
          Make Changes
        </Title>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Position
            </Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-between"
                >
                  {formData.position} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["PC", "CR", "GR", "PV"].map((position) => (
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
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Role
            </Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-between"
                >
                  {formData.role} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Guest", "Alumini", "Student"].map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onSelect={() => handleInputChange("role", role)}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Is Admin
            </Text>
            <Switch
              checked={formData.isAdmin}
              onCheckedChange={(checked) =>
                handleInputChange("isAdmin", checked)
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <Text variant="large" className="text-gray-700 dark:text-gray-300">
              Is Contributor
            </Text>
            <Switch
              checked={formData.isContributor}
              onCheckedChange={(checked) =>
                handleInputChange("isContributor", checked)
              }
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateDialogBox;
