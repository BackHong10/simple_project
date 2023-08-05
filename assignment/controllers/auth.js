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
exports.login = exports.join = void 0;
const auth_1 = require("../services/auth");
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_1.joinService)(req.body.email, req.body.password);
    if (!result) {
        return res.send('회원가입 실패');
    }
    return res.json({
        msg: 'success',
        result: result
    });
});
exports.join = join;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.email, req.body.password);
    const result = yield (0, auth_1.loginService)(req.body.email, req.body.password);
    if (result === 'nonValid user') {
        return res.send('입력하신 정보를 다시 확인해주세요');
    }
    if (result === 'different password') {
        return res.send('입력하신 정보를 다시 확인해주세요');
    }
    return res.json({
        msg: 'success',
        accessToken: result
    });
});
exports.login = login;
