"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAccounts = seedAccounts;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function seedAccounts() {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const users = [
        {
            email: 'admin@example.com',
            fname: 'Admin',
            lname: 'User',
            password: 'admin123',
            role: 'ADMIN',
        },
        {
            email: 'student@example.com',
            fname: 'Student',
            lname: 'Test',
            password: 'student123',
            role: 'USER',
        },
    ];
    for (const user of users) {
        const hashedPassword = bcryptjs_1.default.hashSync(user.password, salt);
        await prisma.account.create({
            data: {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                password: hashedPassword,
                role: user.role,
            },
        });
    }
    console.warn('✅ Seeded 2 users:  admin, student');
}
//# sourceMappingURL=account.js.map