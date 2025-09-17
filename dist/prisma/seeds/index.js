"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const client_1 = require("@prisma/client");
const account_1 = require("./users/account");
const prisma = new client_1.PrismaClient();
async function seedData() {
    await (0, account_1.seedAccounts)();
}
seedData()
    .catch((e) => {
    console.error(e);
    node_process_1.default.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=index.js.map