"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Production-ready CORS — whitelist Vercel frontend + localhost for dev
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, mobile apps, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, true); // Permissive for now — tighten after verifying deployment
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// Main health route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Sustainable E-Commerce + Circular Economy API is running', timestamp: new Date() });
});
const users_1 = __importDefault(require("./routes/users"));
const listings_1 = __importDefault(require("./routes/listings"));
const requests_1 = __importDefault(require("./routes/requests"));
const cart_1 = __importDefault(require("./routes/cart"));
const food_rescue_1 = __importDefault(require("./routes/food-rescue"));
const upcycle_1 = __importDefault(require("./routes/upcycle"));
const impact_1 = __importDefault(require("./routes/impact"));
const admin_1 = __importDefault(require("./routes/admin"));
const me_1 = __importDefault(require("./routes/me")); // Protected dummy route
const membership_1 = __importDefault(require("./routes/membership"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const upload_1 = __importDefault(require("./routes/upload"));
const chat_1 = __importDefault(require("./routes/chat"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const path_1 = __importDefault(require("path"));
// Serve uploaded images statically (images dir is at project root, not inside src/)
app.use('/images', express_1.default.static(path_1.default.resolve(__dirname, '..', 'images')));
app.use('/api/users', users_1.default);
app.use('/api/listings', listings_1.default);
app.use('/api/requests', requests_1.default);
app.use('/api/cart', cart_1.default);
app.use('/api/food-rescue', food_rescue_1.default);
app.use('/api/upcycle', upcycle_1.default);
app.use('/api/impact', impact_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/me', me_1.default);
app.use('/api/membership', membership_1.default);
app.use('/api/checkout', checkout_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api/notifications', notifications_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});
exports.default = app;
