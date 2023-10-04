"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQCObject = void 0;
function isQCObject(obj) {
    return (typeof obj.name === 'string' &&
        typeof obj.content === 'string');
}
exports.isQCObject = isQCObject;
//# sourceMappingURL=interfaces.js.map