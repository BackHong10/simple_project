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
exports.readPostById = exports.readPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const post_1 = require("../services/post");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_1.createPostService)(req.body.content, req.user.id);
    if (result === 'error') {
        return res.send("error");
    }
    else if (result === 'success') {
        return res.send('게시물 등록 성공');
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_1.updatePostService)(req.body.content, res.locals.user.id, Number(req.params.id));
    if (result === 'different UserId') {
        return res.send("수정권한이 없습니다.");
    }
    else if (result === 'error') {
        return res.send('error');
    }
    else if (result === 'success') {
        return res.send('수정 성공');
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_1.deletePostService)(res.locals.user.id, Number(req.params.id));
    if (result === 'different UserId') {
        return res.send("삭제 권한이 없습니다.");
    }
    else if (result === 'error') {
        return res.send('error');
    }
    else if (result === 'success') {
        return res.send('삭제 성공');
    }
});
exports.deletePost = deletePost;
const readPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const result = yield (0, post_1.readAllPostService)(Number(page), Number(limit));
    return res.json({ post: result });
});
exports.readPost = readPost;
const readPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_1.readPostByIdService)(Number(req.params.id));
    return res.json({ post: result });
});
exports.readPostById = readPostById;
