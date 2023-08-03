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
exports.readPostByIdService = exports.readAllPostService = exports.deletePostService = exports.updatePostService = exports.createPostService = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const createPostService = (content, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield post_1.default.create({
            content: content,
            UserId: userId
        });
        return 'success';
    }
    catch (error) {
        console.log(error);
        return 'error';
    }
});
exports.createPostService = createPostService;
const updatePostService = (content, userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findOne({
            where: {
                id: postId
            },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id']
                }
            ]
        });
        if ((post === null || post === void 0 ? void 0 : post.UserId) !== userId) {
            return 'different UserId';
        }
        yield post_1.default.update({ content: content }, { where: { id: postId } });
        return 'success';
    }
    catch (error) {
        console.log(error);
        return 'error';
    }
});
exports.updatePostService = updatePostService;
const deletePostService = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findOne({
            where: {
                id: postId
            },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id']
                }
            ]
        });
        if ((post === null || post === void 0 ? void 0 : post.UserId) !== userId) {
            return 'different UserId';
        }
        yield post_1.default.destroy({ where: {
                id: postId
            } });
        return 'success';
    }
    catch (error) {
        console.log(error);
        return 'error';
    }
});
exports.deletePostService = deletePostService;
const readAllPostService = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findAll({
            offset: page ? (page - 1) * limit : 0,
            limit: limit
        });
        return post;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readAllPostService = readAllPostService;
const readPostByIdService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.default.findOne({
        where: {
            id: postId
        }
    });
    return post;
});
exports.readPostByIdService = readPostByIdService;
