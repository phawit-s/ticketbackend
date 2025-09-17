"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
exports.decodeToken = decodeToken;
exports.createAccessToken = createAccessToken;
exports.createRefreshToken = createRefreshToken;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.decodeTokenWithoutSecret = decodeTokenWithoutSecret;
exports.generateHexCode = generateHexCode;
exports.generateCode = generateCode;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const JWT_SECRET = () => {
    return process.env.JWT_SECRET;
};
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
async function comparePasswords(password, storepassword) {
    return bcrypt.compare(password, storepassword);
}
async function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET());
        return decoded;
    }
    catch (err) {
        console.error('Error decoding token:', err.message);
        return null;
    }
}
async function createAccessToken(user) {
    try {
        const payload = user;
        return jwt.sign(payload, JWT_SECRET(), { expiresIn: '3d' });
    }
    catch (err) {
        console.error('Error signing token:', err.message);
        return null;
    }
}
async function createRefreshToken(user) {
    try {
        const payload = user;
        return jwt.sign(payload, JWT_SECRET(), { expiresIn: '7d' });
    }
    catch (err) {
        console.error('Error signing token:', err.message);
        return null;
    }
}
async function createToken(payload, key, expiresIn) {
    try {
        return jwt.sign(payload, key, { expiresIn });
    }
    catch (err) {
        console.error('Error signing token:', err.message);
        return null;
    }
}
async function verifyToken(token, key) {
    try {
        return jwt.verify(token, key);
    }
    catch (err) {
        console.error('Error verifying token:', err.message);
        return null;
    }
}
async function decodeTokenWithoutSecret(token) {
    return jwt.decode(token);
}
async function generateHexCode(count) {
    const byteCount = Math.ceil(count / 2);
    const randomString = (0, crypto_1.randomBytes)(byteCount).toString('hex').toUpperCase();
    return randomString.slice(0, count);
}
async function generateCode(count) {
    let code = '';
    while (code.length < count) {
        code += Math.floor(Math.random() * 10);
    }
    return code.slice(0, count);
}
//# sourceMappingURL=auth.js.map