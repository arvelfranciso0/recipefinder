"use client";

import React, { useState } from "react";
import { Upload, X, Camera } from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Modal from "@/components/ui/modal";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Wrapper to handle sizing and entry animation since Card is "clean" */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1c221a] rounded-[2.5rem] shadow-2xl border border-muted/10 p-8 text-center animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 p-2 rounded-full hover:bg-muted/10 text-muted transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-foreground">
            Update Profile Picture
          </h3>
          <p className="text-sm text-muted font-medium mt-1">
            Show the world your best chef's smile!
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative group flex flex-col items-center justify-center border-2 border-dashed rounded-[2.5rem] transition-all duration-300 min-h-[300px] ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted/20 bg-muted/5 hover:border-primary/50"
          }`}
        >
          {preview ? (
            <div className="relative w-full h-full flex flex-col items-center p-4">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-background shadow-xl mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Camera className="text-white w-8 h-8" />
                </button>
              </div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">
                Image Selected
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-5 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div className="text-center px-4">
                <p className="font-bold text-foreground">
                  Drag and drop your photo
                </p>
                <p className="text-xs text-muted mt-1">
                  PNG, JPG or GIF (max. 5MB)
                </p>
              </div>
              <label className="mt-2">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleFile(e.target.files[0])
                  }
                />
                <span className="bg-background border border-muted/20 px-6 py-2 rounded-xl text-sm font-black uppercase tracking-wider cursor-pointer hover:bg-muted/5 transition-colors">
                  Browse Files
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-2xl font-bold text-muted"
          >
            Cancel
          </Button>
          <Button
            disabled={!preview}
            onClick={() => selectedFile && onUpload(selectedFile)}
            className="rounded-2xl font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {preview ? "Save Photo" : "Select Photo"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
