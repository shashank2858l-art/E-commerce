"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Ensure images directory exists (at project root: backend/images/)
const imagesDir = path_1.default.resolve(__dirname, '..', '..', 'images');
if (!fs_1.default.existsSync(imagesDir)) {
    fs_1.default.mkdirSync(imagesDir, { recursive: true });
}
// Multer Storage Configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
        // Generate unique name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Extract extension safely
        const ext = path_1.default.extname(file.originalname) || '';
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});
// @route   POST /api/upload
// @desc    Upload an image or video to the backend
// @access  Public
router.post('/', upload.single('media'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Construct the public URL 
        // Usually via the server's host variable or manually via pathing
        // For localhost usage based on the env: HTTP
        const hostUrl = req.protocol + '://' + req.get('host');
        const publicUrl = `${hostUrl}/images/${req.file.filename}`;
        res.status(201).json({
            message: 'File uploaded successfully',
            url: publicUrl
        });
    }
    catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Server error during file upload' });
    }
});
exports.default = router;
