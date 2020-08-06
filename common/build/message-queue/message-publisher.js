"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePublisher = void 0;
var kafkajs_1 = require("kafkajs");
var MessagePublisher = /** @class */ (function () {
    function MessagePublisher(brokers, clientId) {
        var kafkaConfig = new kafkajs_1.Kafka({
            brokers: [brokers],
            clientId: clientId
        });
        this.producer = kafkaConfig.producer();
    }
    MessagePublisher.prototype.connectAsync = function () {
        return this.producer.connect();
    };
    MessagePublisher.prototype.disconnectAsync = function () {
        return this.producer.disconnect();
    };
    MessagePublisher.prototype.publishAsync = function (topicName, payload) {
        return this.producer
            .send({
            topic: topicName,
            messages: [{ value: JSON.stringify(payload) }],
        })
            .catch(function (e) { return console.error(e.message, e); });
    };
    return MessagePublisher;
}());
exports.MessagePublisher = MessagePublisher;
