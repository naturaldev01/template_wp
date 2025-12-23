import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('template')
  getTemplateId() {
    return {
      templateId: '743966878172664'
    };
  }
}
