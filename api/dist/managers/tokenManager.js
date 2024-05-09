"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (values) => {
    return jsonwebtoken_1.default.sign(values, process.env.JWT_SECRET, {
        expiresIn: '2m',
    });
};
exports.createToken = createToken;
const verifyAuthToken = (token) => {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return user;
    }
    catch (error) {
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
