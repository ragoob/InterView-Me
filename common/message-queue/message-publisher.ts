import { IMessagePublisher } from "./message-publisher.interface";
import { Kafka, Producer } from 'kafkajs';
export class MessagePublisher implements IMessagePublisher {
    private producer: Producer;
    constructor(brokers: string, clientId: string) {
        const kafkaConfig: Kafka = new Kafka({
            brokers: [brokers],
            clientId: clientId
        });
        this.producer = kafkaConfig.producer();
    }
    connectAsync(): Promise<any> {
        return this.producer.connect();
    }
    disconnectAsync(): Promise<any> {
        return this.producer.disconnect();
    }
    publishAsync(topicName: string, payload: any): Promise<any> {
        return this.producer
            .send({
                topic: topicName,
                messages: [{ value: JSON.stringify(payload) }],
            })
            .catch(e => console.error(e.message, e));
    }

}