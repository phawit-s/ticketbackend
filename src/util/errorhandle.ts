import { HttpException, NotFoundException, HttpStatus } from '@nestjs/common';

export function handleError(error: any): never {
  let statusCode =
    error?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let messageTh =
    error?.response?.messageTh || 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
  let messageEn = error?.response?.messageEn || 'Internal server error';

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

export function handleNotfound(
  messageTh: string,
  messageEn: string,
): HttpException {
  throw new HttpException(
    {
      statusCode: 400,
      messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
      messageEn: messageEn || 'Data not found',
      data: null,
    },
    400,
  );
}

export function handleunauthorize(
  messageTh: string,
  messageEn: string,
): HttpException {
  throw new HttpException(
    {
      statusCode: 401,
      messageTh: messageTh || 'ไม่พบข้อมูลที่ต้องการ',
      messageEn: messageEn || 'Data not found',
      data: null,
    },
    401,
  );
}
