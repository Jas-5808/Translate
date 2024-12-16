"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speed_1 = __importDefault(require("./routes/speed"));
const user_1 = __importDefault(require("./routes/user"));
const logger_1 = require("./middlewares/logger");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use(logger_1.logger);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'client')));
// Routes
app.use('/api/speed', speed_1.default);
app.use('/api/user', user_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
