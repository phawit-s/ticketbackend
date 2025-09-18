"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bull_ui_1 = __importDefault(require("./util/bull-ui"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, bull_ui_1.default)(app);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ticket API')
        .setDescription('API documentation for Ticket Service')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map