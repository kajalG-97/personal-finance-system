"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(400).json({ error: "User registration failed" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await (0, bcrypt_1.comparePassword)(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};
exports.login = login;
