import { Kafka }  from 'kafkajs'

export const kafka = new Kafka({
    clientId: 'kafka-demo',
    brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099'],
})
