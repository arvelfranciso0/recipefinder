import axios from "axios";

export class CloudinaryService {
  uploadImage(file: File): Promise<{ public_id: string; secure_url: string }> {
    return new Promise(async (resolve, reject) => {
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
}
