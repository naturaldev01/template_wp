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
let AppController = class AppController {
    API_BASE_URL = 'https://mpz66w.api.infobip.com';
    API_KEY = 'dd6a2058f6eb6e0c19596de6bb875c2d-8c2b4ae1-249a-4e12-b53d-ad769ed19e83';
    TEMPLATE_ID = '743966878172664';
    SENDER = '902129190555';
    LANGUAGE_MAP = {
        'arabic': 'ar',
        'english': 'en',
        'turkish': 'tr',
        'french': 'fr',
        'german': 'de',
        'spanish': 'es',
        'portuguese': 'pt_PT',
        'russian': 'ru',
        'chinese': 'zh_CN',
        'japanese': 'ja',
        'korean': 'ko',
        'italian': 'it',
        'dutch': 'nl',
        'polish': 'pl',
        'hebrew': 'he',
        'hindi': 'hi',
        'indonesian': 'id',
        'malay': 'ms',
        'thai': 'th',
        'vietnamese': 'vi',
        'persian': 'fa',
        'urdu': 'ur',
    };
    async sendWhatsApp(body) {
        let data = body;
        if (typeof body === 'string') {
            try {
                data = JSON.parse(body);
            }
            catch {
                throw new common_1.HttpException('Invalid JSON', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const Phone = data.Phone;
        const Language = data.Language;
        const templateName = data.templateName;
        const parameterName = data.parameterName;
        if (!Phone || !Language || !templateName || !parameterName) {
            throw new common_1.HttpException('Phone, Language, templateName ve parameterName zorunlu', common_1.HttpStatus.BAD_REQUEST);
        }
        const langCode = this.LANGUAGE_MAP[Language.toLowerCase()] || 'en';
        const payload = {
            messages: [
                {
                    from: this.SENDER,
                    to: Phone,
                    content: {
                        templateName: templateName,
                        templateData: {
                            body: {
                                placeholders: [],
                            },
                            buttons: [
                                {
                                    type: 'URL',
                                    parameter: parameterName,
                                },
                            ],
                        },
                        language: langCode,
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
            const result = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(result, response.status);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Infobip API error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async scheduleEazybe(body) {
        const EAZYBE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOjc2NTIxLCJpYXQiOjE3MzEzMTQwOTQsImV4cCI6MTczMzExNDA5NH0.vO3Urm1gM3Y-7RWrbo44VqxpTLkmgQm-KhFzlv0z4WY';
        let data = body;
        if (typeof body === 'string') {
            try {
                data = JSON.parse(body);
            }
            catch {
                throw new common_1.HttpException('Invalid JSON', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const { from, to, message, name, time } = data;
        if (!from || !to || !message || !name || !time) {
            throw new common_1.HttpException('from, to, message, name ve time zorunlu', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = { from, to, message, name, time };
        try {
            const response = await fetch('https://api.eazybe.com/v2/scheduler/public-scheduler', {
                method: 'POST',
                headers: {
                    'Authorization': EAZYBE_TOKEN,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(result, response.status);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Eazybe API error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendNoResponse(body) {
        let data = body;
        if (typeof body === 'string') {
            try {
                data = JSON.parse(body);
            }
            catch {
                throw new common_1.HttpException('Invalid JSON', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        const { Phone, Language, templateName, parameterName } = data;
        if (!Phone || !Language || !templateName || !parameterName) {
            throw new common_1.HttpException('Phone, Language, templateName ve parameterName zorunlu', common_1.HttpStatus.BAD_REQUEST);
        }
        const langCode = this.LANGUAGE_MAP[Language.toLowerCase()] || 'en';
        const mediaURLMap = {
            'fr': 'https://i.ibb.co/CWcyZDs/Wp-FR.jpg',
            'it': 'https://i.ibb.co/PcJtDkg/Wp-IT.jpg',
            'es': 'https://i.ibb.co/HC7cW4Z/Wp-SP.jpg',
            'en': 'https://i.ibb.co/m8bMb2p/Wp-EN.jpg',
            'de': 'https://i.ibb.co/PCNczwG/Wp-DE.jpg',
        };
        const templateMediaURL = mediaURLMap[langCode] || mediaURLMap['en'];
        const payload = {
            messages: [
                {
                    from: this.SENDER,
                    to: Phone,
                    content: {
                        templateName: templateName,
                        templateData: {
                            body: {
                                placeholders: [],
                            },
                            header: {
                                type: 'IMAGE',
                                mediaUrl: templateMediaURL,
                            },
                            buttons: [
                                {
                                    type: 'QUICK_REPLY',
                                    parameter: "Ça m'intéresse",
                                },
                                {
                                    type: 'QUICK_REPLY',
                                    parameter: 'Pas maintenant',
                                },
                            ],
                        },
                        language: langCode,
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
            const result = await response.json();
            if (!response.ok) {
                throw new common_1.HttpException(result, response.status);
            }
            return result;
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
                Phone: { type: 'string', example: '+901234823746' },
                Language: { type: 'string', example: 'Arabic' },
                templateName: { type: 'string', example: 'test_api' },
                parameterName: { type: 'string', example: '?id=645008000746844021' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mesaj başarıyla gönderildi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz istek' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendWhatsApp", null);
__decorate([
    (0, common_1.Post)('schedule-eazybe'),
    (0, swagger_1.ApiOperation)({ summary: 'Eazybe üzerinden mesaj zamanla' }),
    (0, swagger_1.ApiBody)({
        description: 'Eazybe scheduler için gerekli bilgiler',
        schema: {
            type: 'object',
            properties: {
                from: { type: 'string', example: 'system.admin@natural.clinic' },
                to: { type: 'string', example: '905375244180' },
                message: { type: 'string', example: 'Hello World' },
                name: { type: 'string', example: 'Vats' },
                time: { type: 'string', example: '2025-12-18T17:09:00.000Z' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mesaj başarıyla zamanlandı' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz istek' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "scheduleEazybe", null);
__decorate([
    (0, common_1.Post)('send-no-response'),
    (0, swagger_1.ApiOperation)({ summary: 'No Response WhatsApp template mesajı gönder (header image + quick reply buttons)' }),
    (0, swagger_1.ApiBody)({
        description: 'No Response template için gerekli bilgiler',
        schema: {
            type: 'object',
            properties: {
                Phone: { type: 'string', example: '+901234823746' },
                Language: { type: 'string', example: 'Arabic' },
                templateName: { type: 'string', example: 'test_api' },
                parameterName: { type: 'string', example: '?id=645008000746844021' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mesaj başarıyla gönderildi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Geçersiz istek' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendNoResponse", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('WhatsApp'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map