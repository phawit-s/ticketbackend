"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const authmodel_1 = require("../model/authmodel");
const auth_1 = require("../util/auth");
let AuthGuard = class AuthGuard {
    authModel;
    constructor(authModel) {
        this.authModel = authModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if ((await this.validateRequest(request)) === true) {
            return await this.validateRequest(request);
        }
        else {
            throw new common_1.HttpException({
                messageEn: 'Forbidden resource',
                messageTh: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูล',
                statusCode: 403,
            }, 403);
        }
    }
    async validateRequest(request) {
        const headerAuth = request.headers['authorization'];
        if (headerAuth) {
            try {
                const token = headerAuth.split(' ')[1];
                const decodedata = await (0, auth_1.decodeToken)(token);
                if (decodedata) {
                    const userdata = await this.authModel.findOneByEmail(decodedata.email);
                    if (userdata) {
                        request.user = { ...userdata };
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log('error at validate auth token');
                console.error(error);
                return false;
            }
        }
        return false;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authmodel_1.AuthModel])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map