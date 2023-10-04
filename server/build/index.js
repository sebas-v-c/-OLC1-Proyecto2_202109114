"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./api/server"));
const port = process.env.SERVPORT || 5000;
server_1.default.listen(port, () => console.log(`Listening on port ${port}...`));
//# sourceMappingURL=index.js.map