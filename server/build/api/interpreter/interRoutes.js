"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const schema_1 = require("../schema");
const router = express_1.default.Router();
exports.router = router;
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
router.post('/interpret', (req, res) => {
    const { error, value } = schema_1.QCObjectSchema.validate(req.body);
    if (error) {
        res.status(400).send('Invalid JSON structure');
        return;
    }
    const qcObj = value;
    res.status(200).json({ message: "accpeted" });
});
router.get('/AST', (req, res) => {
    const { error, value } = schema_1.QCObjectSchema.validate(req.body);
    if (error) {
        res.status(400).send('Invalid JSON structure');
        return;
    }
    const qcObj = value;
});
//# sourceMappingURL=interRoutes.js.map