// 1. Import multer
import multer from "multer";

// 2. Configure storage with filename and location
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads/'); // The path where the files will be stored in your server
    },

    filename: (req, file, cb)=> {
        cb(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);
    },
});

export const upload = multer({ storage: storage});