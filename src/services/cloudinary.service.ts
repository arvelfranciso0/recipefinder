import { cloudinary } from "@/libs/cloudinary";
import axios from "axios";

export class CloudinaryService {
  uploadImage(file: File): Promise<{ public_id: string; secure_url: string }> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
      );

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          formData,
        )
        .then((response) => {
          const data = {
            public_id: response.data.public_id,
            secure_url: response.data.secure_url,
          };
          resolve(data);
        })
        .catch((error) => {
          console.error("Cloudinary upload error:", error);
          reject(error);
        });
    });
  }

  async deleteAvatar(publicId: string): Promise<boolean> {
    if (!publicId) {
      return false;
    }
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Result", result);
      return result.result === "ok";
    } catch (error) {
      console.log("Error occured when deleting the avatar.", error);
      return false;
    }
  }
}
