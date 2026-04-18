"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const qrcode_1 = __importDefault(require("qrcode"));
const router = express_1.default.Router();
// Generate UPI Payment Intent for Generic Checkouts (Products/Cart)
router.post('/intent', auth_middleware_1.requireAuth, async (req, res) => {
    try {
        const { amount, note, details } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid checkout amount' });
        }
        // Construct standard UPI deep link
        const merchantId = process.env.MERCHANT_UPI_ID || 'ecoloop@upi';
        const merchantName = 'Reuse_mart Checkout';
        const transactionNote = note || `Purchase Validation`;
        const upiString = `upi://pay?pa=${merchantId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
        // Generate Base64 QR Code
        const qrDataUrl = await qrcode_1.default.toDataURL(upiString, { width: 300, margin: 2 });
        res.json({
            success: true,
            amount,
            upiString,
            qrDataUrl
        });
    }
    catch (error) {
        console.error('Checkout Intent Error:', error);
        res.status(500).json({ error: 'Failed to generate checkout intent' });
    }
});
// Finalize generic checkout
router.post('/confirm', auth_middleware_1.requireAuth, async (req, res) => {
    try {
        // In a real database we would change the item's status to 'sold' or drop cart items.
        // Accept address details and payment confirmation.
        const { details } = req.body;
        // Generate a simple digital receipt payload
        const receiptPayload = `ECO_RECEIPT|${req.user?.id}|${Date.now()}`;
        const receiptUrl = await qrcode_1.default.toDataURL(receiptPayload, { width: 300, margin: 2 });
        res.json({
            success: true,
            message: 'Checkout complete. Items secured!',
            receiptUrl
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to finalize checkout' });
    }
});
exports.default = router;
