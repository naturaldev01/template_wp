import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

class DataDto {
  Phone: string;
  Language: string;
  parameterName: string;
}

class SendWhatsAppDto {
  data: DataDto;
}

@ApiTags('WhatsApp')
@Controller()
export class AppController {
  private readonly API_BASE_URL = 'https://mpz66w.api.infobip.com';
  private readonly API_KEY = 'dd6a2058f6eb6e0c19596de6bb875c2d-8c2b4ae1-249a-4e12-b53d-ad769ed19e83';
  private readonly TEMPLATE_ID = '743966878172664';
  private readonly SENDER = '902129190555';

  @Post('send-whatsapp')
  @ApiOperation({ summary: 'WhatsApp template mesajı gönder' })
  @ApiBody({
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
  })
  @ApiResponse({ status: 200, description: 'Mesaj başarıyla gönderildi' })
  @ApiResponse({ status: 400, description: 'Geçersiz istek' })
  async sendWhatsApp(@Body() body: SendWhatsAppDto) {
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
        throw new HttpException(data, response.status);
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Infobip API error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
