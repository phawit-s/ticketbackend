"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
exports.handleNotfound = handleNotfound;
exports.handleunauthorize = handleunauthorize;
const common_1 = require("@nestjs/common");
function handleError(error) {
    let statusCode = error?.response?.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let messageTh = error?.response?.messageTh || 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
    let messageEn = error?.response?.messageEn || 'Internal server error';
    throw new common_1.HttpException({
        statusCode,
        messageTh,
        messageEn,
        data: null,
    }, statusCode);
}
function handleNotfound(messageTh, messageEn) {
    throw new common_1.HttpException({
        statusCode: 400,
        messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
        messageEn: messageEn || 'Data not found',
        data: null,
    }, 400);
}
function handleunauthorize(messageTh, messageEn) {
    throw new common_1.HttpException({
        statusCode: 401,
        messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
        messageEn: messageEn || 'Data not found',
        data: null,
    }, 401);
}
//# sourceMappingURL=errorhandle.js.map