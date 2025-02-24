import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka, Producer } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka: Kafka;
    private readonly consumers: Consumer[] = [];

    constructor() {
        this.kafka = new Kafka({
        brokers: ['localhost:9092'],
        });
    }
    async consume (topics:ConsumerSubscribeTopics,config:ConsumerRunConfig){
        const consumer=this.kafka.consumer({groupId:"nest-js-konfig"});
        await consumer.connect();
        await consumer.subscribe(topics);
        await consumer.run(config);
        this.consumers.push(consumer);
    }
    async onApplicationShutdown(signal?: string) {
        for(const consumer of this.consumers){
            await consumer.disconnect();
        }
    }
}
