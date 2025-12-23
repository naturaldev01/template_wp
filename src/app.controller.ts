import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('WhatsApp')
@Controller()
export class AppController {
  private readonly API_BASE_URL = 'https://mpz66w.api.infobip.com';
  private readonly API_KEY = 'dd6a2058f6eb6e0c19596de6bb875c2d-8c2b4ae1-249a-4e12-b53d-ad769ed19e83';
  private readonly TEMPLATE_ID = '743966878172664';
  private readonly SENDER = '902129190555';

  // Dil mapping - Infobip ISO kodları kullanıyor
  private readonly LANGUAGE_MAP: Record<string, string> = {
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

  @Post('send-whatsapp')
  @ApiOperation({ summary: 'WhatsApp template mesajı gönder' })
  @ApiBody({
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
  })
  @ApiResponse({ status: 200, description: 'Mesaj başarıyla gönderildi' })
  @ApiResponse({ status: 400, description: 'Geçersiz istek' })
  async sendWhatsApp(@Body() body: any) {
    // Zoho string olarak gönderebilir, parse edelim
    let data = body;
    if (typeof body === 'string') {
      try {
        data = JSON.parse(body);
      } catch {
        throw new HttpException('Invalid JSON', HttpStatus.BAD_REQUEST);
      }
    }

    const Phone = data.Phone;
    const Language = data.Language;
    const templateName = data.templateName;
    const parameterName = data.parameterName;

    if (!Phone || !Language || !templateName || !parameterName) {
      throw new HttpException('Phone, Language, templateName ve parameterName zorunlu', HttpStatus.BAD_REQUEST);
    }

    // Dil kodunu al
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
        throw new HttpException(result, response.status);
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Infobip API error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
