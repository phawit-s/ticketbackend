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
exports.CreateTicketDto = void 0;
const class_validator_1 = require("class-validator");
const ticket_enum_1 = require("../../enum/ticket.enum");
const swagger_1 = require("@nestjs/swagger");
class CreateTicketDto {
    title;
    description;
    status;
    priority;
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'title' }),
    (0, class_validator_1.MinLength)(5, { message: 'title must be at least 5 characters' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'description', required: false }),
    (0, class_validator_1.MaxLength)(5000, { message: 'description must be <= 5000 characters' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OPEN', enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'] }),
    (0, class_validator_1.IsEnum)(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LOW', enum: ['LOW', 'MEDIUM', 'HIGH'] }),
    (0, class_validator_1.IsEnum)(['LOW', 'MEDIUM', 'HIGH']),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
//# sourceMappingURL=create-ticket.dto.js.map