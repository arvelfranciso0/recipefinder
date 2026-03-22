"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Scissors } from "lucide-react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Card from "@/components/ui/card";
import { getCroppedImg } from "@/libs/utils";

interface CropModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  onConfirm: (croppedFile: File | null) => void;
}

export function CropImageModal({
  isOpen,
  image,
  onClose,
  onConfirm,
}: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    if (!completedCrop) return;
    const file = await getCroppedImg(image, completedCrop);
    onConfirm(file);
    setLoading(false);
  }, [completedCrop]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg animate-in zoom-in-95 duration-300">
        <Card>
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute -right-2 -top-2 p-2 text-muted"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black">Crop Your Photo</h3>
              <p className="text-sm text-muted">
                Position your photo for the best look.
              </p>
            </div>

            {/* Cropper Container */}
            <div className="relative w-full h-80 rounded-[2rem] overflow-hidden bg-muted/10 border border-muted/20">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                // This gives you the EXACT pixels needed for the canvas
                onCropComplete={(_, croppedPixels) =>
                  setCompletedCrop(croppedPixels)
                }
              />
            </div>

            {/* Zoom Slider */}
            <div className="mt-6 space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-muted text-center">
                Zoom Level
              </p>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-muted/20 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-2xl font-bold"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="rounded-2xl font-black uppercase bg-primary text-white shadow-lg shadow-primary/20"
              >
                {loading ? "Processing..." : "Set Profile"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
}
