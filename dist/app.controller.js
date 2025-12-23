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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class DataDto {
    Phone;
    Language;
    parameterName;
}
class SendWhatsAppDto {
    data;
}
let AppController = class AppController {
    API_BASE_URL = 'https://mpz66w.api.infobip.com';
    API_KEY = 'dd6a2058f6eb6e0c19596de6bb875c2d-8c2b4ae1-249a-4e12-b53d-ad769ed19e83';
    TEMPLATE_ID = '743966878172664';
    SENDER = '902129190555';
    async sendWhatsApp(body) {
        const { Phone, Language, parameterName } = body.data;
        const payload = {
            messages: [
                {
                    from: this.SENDER,
                    to: Phone,
                    content: {
                        templateName: 'test_api',
                        templateData: {
                            body: {
                                placeholders: [parameterName],
                            },
                        },
                        language: Language.toLowerCase(),
                    },
                },
            ],
        };
        try {
            const response = await fetch(`${this.API_BASE_URL}/whatsapp/1/message/template`, {
                method: 'POST',
                headers: {
                    'Authorization': `App ${this.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(data, response.status);
            }
            return data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Infobip API error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('send-whatsapp'),
    (0, swagger_1.ApiOperation)({ summary: 'WhatsApp template mesajı gönder' }),
    (0, swagger_1.ApiBody)({
        description: 'WhatsApp mesajı için gerekli bilgiler',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        Phone: { type: 'string', example: '+901234823746' },
                        Language: { type: 'string', example: 'Arabic' },
                        parameterName: { type: 'string', example: '?id=645008000746844021' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mesaj başarıyla gönderildi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz istek' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendWhatsAppDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendWhatsApp", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('WhatsApp'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map