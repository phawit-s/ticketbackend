import { HttpException, NotFoundException, HttpStatus } from '@nestjs/common';

export function handleError(error: any): never {
  const statusCode =
    error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const messageTh =
    error?.response?.messageTh || 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
  const messageEn = error?.response?.messageEn || 'Internal server error';

  throw new HttpException(
    {
      statusCode,
      messageTh,
      messageEn,
      data: null,
    },
    statusCode,
  );
}

export function handleNotfound(messageTh?: string, messageEn?: string): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.NOT_FOUND,
      messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
      messageEn: messageEn || 'Data not found',
      data: null,
    },
    HttpStatus.NOT_FOUND,
  );
}

export function handleUnauthorize(
  messageTh?: string,
  messageEn?: string,
): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      messageTh: messageTh || 'ไม่ได้รับอนุญาต',
      messageEn: messageEn || 'Unauthorized',
      data: null,
    },
    HttpStatus.UNAUTHORIZED,
  );
}

export function handleValidationError(
  messageTh?: string,
  messageEn?: string,
): never {
  throw new HttpException(
    {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      messageTh: messageTh || 'ข้อมูลไม่ผ่านการตรวจสอบ',
      messageEn: messageEn || 'Validation failed',
      data: null,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
}
