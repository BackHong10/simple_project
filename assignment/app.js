"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const dotenv_1 = __importDefault(require("dotenv"));
const post_1 = __importDefault(require("./routes/post"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
models_1.sequelize.sync().then(() => {
    console.log('데이터베이스 연결에 성공하였습니다.');
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/post', post_1.default);
app.use('/auth', auth_1.default);
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(err);
});
const errorHandler = (err, req, res, next) => {
    res.send(err.message);
};
app.use(errorHandler);
app.listen(app.get('port'), () => {
    console.log('서버가 실행되었습니다.');
});
