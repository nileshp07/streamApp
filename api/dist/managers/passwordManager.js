"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.encryptPassword = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encryptPassword = (password) => {
    return crypto_js_1.default.AES.encrypt(password, process.env.CRYPTOJS_SECRET).toString();
};
exports.encryptPassword = encryptPassword;
const decryptPassword = (password) => {
    return crypto_js_1.default.AES.decrypt(password, process.env.CRYPTOJS_SECRET).toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptPassword = decryptPassword;
