import { HttpException } from '@nestjs/common';
export declare function handleError(error: any): never;
export declare function handleNotfound(messageTh: string, messageEn: string): HttpException;
export declare function handleunauthorize(messageTh: string, messageEn: string): HttpException;
