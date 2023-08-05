"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const post_1 = require("../controllers/post");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
exports.router = express_1.default.Router();
exports.router.post('/', middlewares_1.IsLoggedIn, post_1.createPost);
exports.router.patch('/:id/update', middlewares_1.IsLoggedIn, post_1.updatePost);
exports.router.delete('/:id/delete', middlewares_1.IsLoggedIn, post_1.deletePost);
exports.router.get('/:id', middlewares_1.IsLoggedIn, post_1.readPostById);
exports.router.get('/', middlewares_1.IsLoggedIn, post_1.readPost);
exports.default = exports.router;
