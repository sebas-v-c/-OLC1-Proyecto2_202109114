"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/hol', (req, res) => {
    res.send("SEXOOOOO");
});
exports.app.get('/', (req, res) => {
    res.send('<h1>API WORKING!</h1>');
});
exports.default = exports.app;
//# sourceMappingURL=server.js.map