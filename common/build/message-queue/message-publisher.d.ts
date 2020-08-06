import { IMessagePublisher } from "./message-publisher.interface";
export declare class MessagePublisher implements IMessagePublisher {
    private producer;
    constructor(brokers: string, clientId: string);
    connectAsync(): Promise<any>;
    disconnectAsync(): Promise<any>;
    publishAsync(topicName: string, payload: any): Promise<any>;
}
