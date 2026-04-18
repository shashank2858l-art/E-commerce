"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const qrcode_1 = __importDefault(require("qrcode"));
const supabaseClient_1 = require("../utils/supabaseClient");
const router = express_1.default.Router();
// Common Prices (INR)
const TIER_PRICES = {
    bronze: 0,
    silver: 1,
    gold: 5,
};
// 1. Generate UPI Payment Intent
router.post('/intent', auth_middleware_1.requireAuth, async (req, res) => {
    try {
        const { tier } = req.body;
        if (!tier || !['bronze', 'silver', 'gold'].includes(tier)) {
            return res.status(400).json({ error: 'Invalid tier requested' });
        }
        const price = TIER_PRICES[tier];
        // Construct standard UPI deep link using env variable
        const merchantId = process.env.MERCHANT_UPI_ID || 'ecoloop@upi';
        const merchantName = encodeURIComponent('Reuse_mart Memberships');
        const transactionNote = encodeURIComponent(`Upgrade to ${tier.toUpperCase()}`);
        const upiString = `upi://pay?pa=${merchantId}&pn=${merchantName}&am=${price}&cu=INR&tn=${transactionNote}`;
        // Generate Base64 QR Code
        const qrDataUrl = await qrcode_1.default.toDataURL(upiString, { width: 300, margin: 2 });
        res.json({
            success: true,
            tier,
            price,
            upiString,
            qrDataUrl
        });
    }
    catch (error) {
        console.error('QR Generate Error:', error);
        res.status(500).json({ error: 'Failed to generate payment intent' });
    }
});
// 2. Confirm Payment & Generate Pass
router.post('/confirm', auth_middleware_1.requireAuth, async (req, res) => {
    try {
        const { tier } = req.body;
        const userId = req.user.id;
        if (!tier || !['bronze', 'silver', 'gold'].includes(tier)) {
            return res.status(400).json({ error: 'Invalid tier requested' });
        }
        // In a real app, this is where a Webhook from Razorpay/Stripe would hit.
        // For prototype, we assume the frontend sends the success confirmation.
        // Generate Digital Pass Payload
        const passPayload = `ECO_PASS|${userId}|${tier.toUpperCase()}|${Date.now()}`;
        const passDataUrl = await qrcode_1.default.toDataURL(passPayload, {
            width: 400,
            margin: 3,
            color: { dark: '#000000', light: '#ffffff' }
        });
        // Update Supabase Profiles Table using Admin Client to bypass RLS if needed, or simply let the user update it.
        // Assuming backend has rights to mutate `membership_tier` and `user_qr_data`
        const { data: updatedProfile, error: updateError } = await supabaseClient_1.supabaseAdmin
            .from('profiles')
            .update({
            membership_tier: tier,
            user_qr_data: passDataUrl
        })
            .eq('id', userId)
            .select()
            .single();
        if (updateError) {
            throw updateError;
        }
        res.json({
            success: true,
            message: `${tier.toUpperCase()} Membership Enabled!`,
            passDataUrl,
            profile: updatedProfile
        });
    }
    catch (error) {
        console.error('Membership Confirm Error:', error);
        res.status(500).json({ error: 'Failed to confirm membership upgrade' });
    }
});
exports.default = router;
