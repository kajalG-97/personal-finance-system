"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (ex) {
        res.status(400).send("Invalid token.");
    }
};
exports.authenticate = authenticate;
