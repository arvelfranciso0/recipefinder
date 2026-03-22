"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Card from "@/components/ui/card";
import { CropImageModal } from "@/components/shared/cropImage";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export function UploadAvatarModal({
  isOpen,
  onClose,
  onUpload,
}: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onConfirmCrop = (croppedFile: File | null) => {
    if (!croppedFile) return;
    onUpload(croppedFile);
    setShowCropper(false);
    onClose();
    setTempImage(null);
  };

  return (
    <>
      <Modal isOpen={isOpen && !showCropper} onClose={onClose}>
        <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
          <Card>
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute -right-2 -top-2 p-2 text-muted"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black">Update Photo</h3>
                <p className="text-sm text-muted">
                  Drag a photo here or browse files.
                </p>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files[0])
                    handleFile(e.dataTransfer.files[0]);
                }}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-[2.5rem] min-h-[250px] transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted/20 bg-muted/5 hover:border-primary/50"
                }`}
              >
                <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                  <Upload size={28} />
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFile(e.target.files[0])
                    }
                  />
                  <span className="bg-background border border-muted/20 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-muted/5">
                    Browse Files
                  </span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </Modal>

      {tempImage && (
        <CropImageModal
          isOpen={showCropper}
          image={tempImage}
          onClose={() => setShowCropper(false)}
          onConfirm={onConfirmCrop}
        />
      )}
    </>
  );
}
