export declare class AppController {
    private readonly API_BASE_URL;
    private readonly API_KEY;
    private readonly TEMPLATE_ID;
    private readonly SENDER;
    private readonly LANGUAGE_MAP;
    sendWhatsApp(body: any): Promise<any>;
    scheduleEazybe(body: any): Promise<any>;
    sendNoResponse(body: any): Promise<any>;
}
