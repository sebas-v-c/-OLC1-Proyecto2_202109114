"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const interfaces_1 = require("../interfaces");
const router = express_1.default.Router();
exports.router = router;
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
router.post('/interpret', (req, res) => {
    if (!(0, interfaces_1.isQCObject)(req.body)) {
        res.status(400).send('Invalid JSON structure');
        return;
    }
    const qcObj = req.body;
    res.status(200).json({ message: "ejem" });
});
//# sourceMappingURL=interRoutes.js.map