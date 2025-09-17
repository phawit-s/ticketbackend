import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthModel } from 'src/model/authmodel';
export declare class AuthGuard implements CanActivate {
    authModel: AuthModel;
    constructor(authModel: AuthModel);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateRequest;
}
