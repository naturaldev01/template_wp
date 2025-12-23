import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('template')
  getTemplateId() {
    return {
      templateId: '1956313991962822',
      templateName: 'test_api',
      parameterName: 'Form Parameter',
    };
  }
}
