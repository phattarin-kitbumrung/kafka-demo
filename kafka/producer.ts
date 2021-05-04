import { Kafka } from 'kafkajs'
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
 
const producer = kafka.producer()
 
export const publishMessage = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
  
  console.log("Sending message complete...")
}
