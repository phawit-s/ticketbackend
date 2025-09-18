"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
exports.handleNotfound = handleNotfound;
exports.handleUnauthorize = handleUnauthorize;
exports.handleValidationError = handleValidationError;
const common_1 = require("@nestjs/common");
function handleError(error) {
    const statusCode = error?.response?.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    const messageTh = error?.response?.messageTh || 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
    const messageEn = error?.response?.messageEn || 'Internal server error';
    throw new common_1.HttpException({
        statusCode,
        messageTh,
        messageEn,
        data: null,
    }, statusCode);
}
function handleNotfound(messageTh, messageEn) {
    throw new common_1.HttpException({
        statusCode: common_1.HttpStatus.NOT_FOUND,
        messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
        messageEn: messageEn || 'Data not found',
        data: null,
    }, common_1.HttpStatus.NOT_FOUND);
}
function handleUnauthorize(messageTh, messageEn) {
    throw new common_1.HttpException({
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        messageTh: messageTh || 'ไม่ได้รับอนุญาต',
        messageEn: messageEn || 'Unauthorized',
        data: null,
    }, common_1.HttpStatus.UNAUTHORIZED);
}
function handleValidationError(messageTh, messageEn) {
    throw new common_1.HttpException({
        statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        messageTh: messageTh || 'ข้อมูลไม่ผ่านการตรวจสอบ',
        messageEn: messageEn || 'Validation failed',
        data: null,
    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
}
//# sourceMappingURL=errorhandle.js.map