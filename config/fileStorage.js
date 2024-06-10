import multer from "multer";

// Set up storage location and filenames for uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this folder exists in your project directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.csv')
    }
})

const upload = multer({ storage: storage });

export default upload;