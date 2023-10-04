"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QCObjectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.QCObjectSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    content: joi_1.default.string().required()
});
//# sourceMappingURL=schema.js.map