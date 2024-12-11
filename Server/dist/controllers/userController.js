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
exports.deleteUser = exports.getAllUsers = exports.addUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, coment } = req.body;
    try {
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                coment,
            },
        });
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add user.' });
    }
});
exports.addUser = addUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    if (!id) {
        res.status(400).json({ error: 'Не указан ID пользователя.' });
        return;
    }
    try {
        const deletedUser = yield prisma_1.default.user.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Пользователь успешно удалён', deletedUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Не удалось удалить пользователя.' });
    }
});
exports.deleteUser = deleteUser;
