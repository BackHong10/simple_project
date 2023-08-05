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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.joinService = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joinService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield user_1.default.create({
        email,
        password: hashedPassword
    });
    return result;
});
exports.joinService = joinService;
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        return 'nonValid user';
    }
    const comparePassword = yield bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        return 'different password';
    }
    const accessToken = jsonwebtoken_1.default.sign({ email: user.email, sub: (_a = user.id) === null || _a === void 0 ? void 0 : _a.toString() }, process.env.accessToken, {
        expiresIn: '1h'
    });
    return accessToken;
});
exports.loginService = loginService;
