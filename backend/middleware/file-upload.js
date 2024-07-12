const multer = require("multer");

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter: (req, file, cb) => {
    const isValid = ["image/png", "image/jpg", "image/jpeg"].includes(
      file.mimetype
    );
    let error = isValid ? null : new Error("Invalid mime type.");
    cb(error, isValid);
  },
});
module.exports = fileUpload;
