declare class DataDto {
    Phone: string;
    Language: string;
    parameterName: string;
}
declare class SendWhatsAppDto {
    data: DataDto;
}
export declare class AppController {
    private readonly API_BASE_URL;
    private readonly API_KEY;
    private readonly TEMPLATE_ID;
    private readonly SENDER;
    sendWhatsApp(body: SendWhatsAppDto): Promise<any>;
}
export {};
