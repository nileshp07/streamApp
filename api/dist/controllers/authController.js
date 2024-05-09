"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const passwordManager_1 = require("../managers/passwordManager");
const client_1 = require("@prisma/client");
const tokenManager_1 = require("../managers/tokenManager");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputSchema = zod_1.z.object({
        firstName: (0, zod_1.string)().min(3, 'Minimum 3 charcters requried.'),
        lastName: (0, zod_1.string)().min(3, 'Minimum 3 ch,aracters required.'),
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)().min(8, 'Password must be of minimum of 8 charcters long.'),
    });
    const parsedInput = inputSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(401).json({
            message: 'Invalid inputs.',
            error: parsedInput.error,
        });
    }
    try {
        const existingUser = yield prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return res.status(403).json({
                message: 'User with that email already exists.',
            });
        }
        const newUser = yield prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: (0, passwordManager_1.encryptPassword)(req.body.password),
            },
        });
        return res.status(201).json({
            message: 'Registered Successfully.',
            data: newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    });
    const parsedInput = inputSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(401).json({
            message: 'Invalid inputs.',
            error: parsedInput.error,
        });
    }
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: 'No user found with that email.',
            });
        }
        console.log(req.body.password);
        const decryptedPassword = (0, passwordManager_1.decryptPassword)(user.password);
        console.log(decryptedPassword.length);
        if (decryptedPassword != req.body.password) {
            return res.status(401).json({
                message: 'Wrong Credentials',
            });
        }
        const accessToken = (0, tokenManager_1.createToken)({
            id: user.id,
        });
        res.cookie('accessToken', accessToken);
        return res.status(201).json({
            message: 'Login successfull.',
            token: accessToken,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.clearCookie('accessToken').status(200).json({
        message: 'Successfully Logged OUT.',
    });
});
exports.logout = logout;
