export interface IMessagePublisher {
    publishAsync(topicName: string, payload: any): Promise<any>;
    connectAsync(): Promise<any>;
    disconnectAsync(): Promise<any>;

}