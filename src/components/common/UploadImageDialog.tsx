import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
  currentImage: string;
}

const UploadImageDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, onSave, currentImage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (selectedFile) {

    // call the cloudnairy api to save the image 



      onSave(selectedFile);
      setSelectedFile(null); // Reset after save
    }
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Upload New Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-6">
            {selectedFile ? (
              <div className="relative h-48 w-48">
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="relative h-48 w-48">
                <Image
                  src={currentImage}
                  alt="Current Profile Picture"
                  fill
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
          <label className="flex w-48 cursor-pointer items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          {selectedFile ? (
            <Text variant="small" className="text-gray-500">
              Selected File: {selectedFile.name}
            </Text>
          ) : (
            <Text variant="small" className="text-gray-500">
              Selected File: No File
            </Text>
          )}
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedFile}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageDialog;
