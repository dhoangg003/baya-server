import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const upLoadingSingleFile = (filePath, folder = "mayme-fullstack-app") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
          throw new error();
        } else {
          fs.unlinkSync(filePath);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
    );
  });
};
// const deletingSingleFile = (publicId, folder = "mayme-fullstack-app") => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.destroy(publicId, {
//       resource_type: "auto",
//       folder: folder,
//     });
//   });
// };
const deletingSingleFile = (publicId, folder = "mayme-fullstack-app") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      {
        type: "upload",
        resource_type: "image",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            result: result,
          });
        }
      }
    );
  });
};

const cloudinaryService = {
  upLoadingSingleFile,
  deletingSingleFile,
};

export default cloudinaryService;
